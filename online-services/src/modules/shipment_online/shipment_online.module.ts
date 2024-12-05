import { Module } from '@nestjs/common';
import { ShipmentOnlineService } from './shipment_online.service';
import { providers } from './shipment_online.provider';
import { ShipmentOnlineController } from './shipment_online.controller';

@Module({
  imports: [],
  controllers: [ShipmentOnlineController],
  exports: [ShipmentOnlineService],
  providers: [ShipmentOnlineService, ...providers]
})
export class ShipmentOnlineModule {}
