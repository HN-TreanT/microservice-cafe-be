import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OnlineServiceModule } from '../online_service.module';
import { AuthModule } from 'src/auth_services/auth.module';

@Module({
  imports: [forwardRef(() => OnlineServiceModule), AuthModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
