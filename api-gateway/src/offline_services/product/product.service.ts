import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProductCreate } from "./dto/product-create.dto";
import { ProductEdit } from "./dto/product-edit.dto";
import { ProductFilter } from "./dto/product-filter.dto";
import { ProductOrder } from "./dto/product-order.dto";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class ProductServices {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}


  async onModuleInit() {
    this.offlineClient.subscribeToResponseOf('list-product');
    this.offlineClient.subscribeToResponseOf('detail-product');
    this.offlineClient.subscribeToResponseOf('create-product');
    this.offlineClient.subscribeToResponseOf('edit-product');
    this.offlineClient.subscribeToResponseOf('delete-product');
    this.offlineClient.subscribeToResponseOf('check-valid-material-product');
    await this.offlineClient.connect();
  }

  async get(pagination: any, filter: ProductFilter, order: ProductOrder) {
    const data = await this.offlineClient.send('list-product', { pagination, filter, order }).toPromise();
    return data;
  }

  async getById(id: number){
    const response = await this.offlineClient.send('detail-product', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found product", status: 404 })
    return response
  }

  async create(infoCreate: ProductCreate, file: Express.Multer.File) {
    const response = await this.offlineClient.send('create-product', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit(id: number, infoEdit: ProductEdit, file: Express.Multer.File){
    const response = await this.offlineClient.send('edit-product', {
      id: id, 
      infoEdit: infoEdit
    }).toPromise();
    return response

  }

  async deleteById(id: number) {
    const response = await this.offlineClient.send('delete-product', { id }).toPromise()
    return response
  }

  async checkValidMaterial(amount: number, id_product: number) {
    const response = await this.offlineClient.send('check-valid-material-product', { 
      amount: amount, 
      id_product: id_product
     }).toPromise()
    return response
  }
}
