import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from 'src/constants/repository_enum';
import { Order } from 'src/entities/order.entity';

@Injectable()
export class OrderService {
    @Inject(ORDER_REPOSITORY) private readonly repository: typeof Order
}
