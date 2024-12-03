import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty } from "class-validator";
import { InvoiceDetailEdit } from "src/offline_services/invoice_detail/dto/invoice-detail-edit";

export class SplitInvoice {

  @ApiProperty()
  @IsNotEmpty()
  id_old_order: number;

  @ApiProperty({type: [InvoiceDetailEdit]})
  lst_inovice_detail: InvoiceDetailEdit[];

  @ApiProperty()
  id_tables: number[];
}
