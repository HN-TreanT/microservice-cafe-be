import { forwardRef, Module } from '@nestjs/common';
import { CustomerAddressService } from './customer_address.service';
import { CustomerAddressController } from './customer_address.controller';
import { OnlineServiceModule } from '../online_service.module';
import { AuthModule } from 'src/auth_services/auth.module';

@Module({
  imports: [forwardRef(() => OnlineServiceModule), AuthModule],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
  exports: []
})
export class CustomerAddressModule {}
