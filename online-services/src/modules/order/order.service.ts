import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ORDER_DETAIL_REPOSITORY, ORDER_REPOSITORY, SHIPMENT_ONLINE_REPOSITORY } from 'src/constants/repository_enum';
import { Customer } from 'src/entities/customer.entity';
import { Order } from 'src/entities/order.entity';
import { OrderDetail } from 'src/entities/order_detail.entity';
import { ShipmentOnline } from 'src/entities/shipment_online.entity';
import { OrderCreateDTO } from './dto/order-create.dto';
import { ClientKafka } from '@nestjs/microservices';
import { Sequelize } from 'sequelize';
import { ChangeStatusOrderDTO } from './dto/change-status-order.dto';

@Injectable()
export class OrderService {
   constructor (
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
    @Inject(ORDER_DETAIL_REPOSITORY) private readonly orderDetailRepository: typeof OrderDetail,
    @Inject(SHIPMENT_ONLINE_REPOSITORY) private readonly shippemntOnlineRepository: typeof ShipmentOnline,
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
   ) {
   
   }

   async get(pagination: any, filter: any) : Promise<any> {
    
      const rows = await this.orderRepository.findAll({
         where: {...filter},
        ...pagination,
        include: [ OrderDetail]
      })
      const count = await this.orderRepository.count({  where: {...filter}})

      const custom_rows = await Promise.all(
         rows.map(async (row) => {
           const order_details_custom = await Promise.all(
             row.order_details.map(async (order_detail) => {
               const product = await this.offlineClient.send('detail-product', { id: order_detail.id_product }).toPromise();
               return {
                 ...order_detail.dataValues,
                 product: product
               };
             })
           );     
           return {
             ...row.dataValues,
             order_details: order_details_custom
           };
         })
       );

      const data = {
         count: count, 
         data: custom_rows,
      }

      return data

   }

   async create(dto: OrderCreateDTO) {
      const transaction = await this.sequelize.transaction();
      try {
          const order_create = {
              id_customer: dto.id_customer,
              status: 1
          };
          const order = await this.orderRepository.create(order_create, {
              transaction: transaction
          });
       
          const order_detail_custom = dto.order_details.map((item) => {
              return { 
                  ...item,
                  id_order: order.id
              };
          });
          await this.orderDetailRepository.bulkCreate(order_detail_custom, {
              transaction: transaction
          });
          const totalPrice = dto.order_details.reduce((sum, detail) => sum + detail.quanity * detail.price, 0);
          order.total_price = totalPrice;
          await order.save({ transaction: transaction });
   
          await transaction.commit();
      
          return order.get();
      
      } catch (err) {
          await transaction.rollback();
          console.log(err);
      }
      
   }

   async edit(id: number, dto: OrderCreateDTO) {
    const transaction = await this.sequelize.transaction();
    try {
       const order = await this.orderRepository.findByPk(id)
       if (!order) return {
          status: 404,
          message: 'Order not found'
       };

       if (order.status !== 1) {
        return {
           status: 400,
           message: 'Không thể chỉnh sửa đơn hàng khi hàng đã gửi'
        };
       }

       //remove order detail
       await this.orderDetailRepository.destroy({where: {id_order: order.id}, transaction: transaction})
       const order_detail_custom = dto.order_details.map((item) => {
        return { 
            ...item,
            id_order: order.id
         };     
       });

       //add order detail
       await this.orderDetailRepository.bulkCreate(order_detail_custom, {
        transaction: transaction
       });
       const totalPrice = dto.order_details.reduce((sum, detail) => sum + detail.quanity * detail.price, 0);
       order.total_price = totalPrice;
       await order.save({ transaction: transaction });
       await transaction.commit();
      
       return {
        status: 200,
        data: order.get()
       };


    } catch (err) {
      await transaction.rollback();
      console.log(err);
    }

   }

   async remove(id: number) {
     const transaction = await this.sequelize.transaction();
     try {
      const order = await this.orderRepository.findByPk(id)
      if (!order) return {
        status: 404,
        message: 'Order not found'
      };

      await order.destroy({transaction: transaction})
      await transaction.commit();
      return {
        status: 200,
        message: "success"
      }
   
     } catch (err) {
      await transaction.rollback();
      console.log(err);
     }
   }

   async changeStatusOrder(dto: ChangeStatusOrderDTO) {
    const transaction = await this.sequelize.transaction();
    try {
       console.log(dto)
       const order = await this.orderRepository.findByPk(dto.id_oder)
       if (!order) return {
          status: 404,
          message: 'Order not found'
       };

       order.status = dto.status;
       await order.save({ transaction: transaction });
       await transaction.commit();
       return order.get()
    } catch (err) {

    }
   }
}
