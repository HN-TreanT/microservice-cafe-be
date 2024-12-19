import { forwardRef, Module } from '@nestjs/common';
import { ShipperService } from './shipper.service';
import { ShipperController } from './shipper.controller';
import { OnlineServiceModule } from '../online_service.module';
import { AuthModule } from 'src/auth_services/auth.module';

@Module({
  imports: [forwardRef(() => OnlineServiceModule), AuthModule],
  controllers: [ShipperController],
  providers: [ShipperService],
  exports: []
})
export class ShipperModule {}
