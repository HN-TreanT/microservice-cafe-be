import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CategoryModule } from "./category/category.module";
import { ProductModule } from "./product/product.module";
import { CheckInventoryModule } from "./check_inventory/check-inventory.module";
import { ComboModule } from "./combo/combo.module";
import { CustomerModule } from "./customer/customer.module";
import { DetailComboModule } from "./detail_combo/detail-combo.module";
import { DetailShipmentModule } from "./detail_shipment/detail-shipment.module";
import { DTCheckInventorModule } from "./detail-check-invetory/detail-check-inventor.module";
import { EmployeeModule } from "./employee/employee.module";
import { InvoiceModule } from "./invoice/invoice.module";
import { InvoiceDetailModule } from "./invoice_detail/invoice-detail.module";
import { PositionModule } from "./position/position.module";
import { MaterialModule } from "./material/material.module";
import { PromotionModule } from "./promotion/promotion.module";
import { ShipmentModule } from "./shipment/shipment.module";
import { SupplierModule } from "./supplier/supplier.module";
import { TableModule } from "./table_food/table-food.module";
import { TablefoodInvoiceModule } from "./table_food_invoice/tablefood-invoice.module";
import { UserMaterialModule } from "./use_material/use_material.module";
import { WorkshiftModule } from "./workshift/workshift.module";
import { OfflineServiceServices } from "./offline_services.service";


@Module({
    imports:[
        ClientsModule.register([
            {
              name: "OFFLINE_SERVICES",
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: 'offline-services',
                  brokers: ['kafka:9092'],
                },
                consumer: {
                  groupId: 'offline-services-consumer',
                },
              }
            }
          ]),
          ProductModule, CategoryModule, ProductModule,CheckInventoryModule, ComboModule,CustomerModule,
        DetailComboModule, DetailShipmentModule, DTCheckInventorModule, EmployeeModule, InvoiceModule, InvoiceDetailModule, PositionModule,
        MaterialModule, PromotionModule, ShipmentModule, SupplierModule, TableModule, TablefoodInvoiceModule, UserMaterialModule, WorkshiftModule],
    controllers: [],
    providers: [OfflineServiceServices],
    exports: [ClientsModule]
})

export class OfflineServiceModule{};