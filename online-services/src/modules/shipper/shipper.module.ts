import { Module } from '@nestjs/common';
import { ShipperService } from './shipper.service';
import { ShipperController } from './shipper.controller';
import { providers } from './shipper.provider';

@Module({
  imports: [],
  controllers: [ShipperController],
  providers: [ShipperService, ...providers],
  exports: [ShipperService]
})
export class ShipperModule {}
