import { Inject, Injectable } from '@nestjs/common';
import { ORDER_DETAIL_REPOSITORY } from 'src/constants/repository_enum';
import { OrderDetail } from 'src/entities/order_detail.entity';

@Injectable()
export class OrderDetailService {
    @Inject(ORDER_DETAIL_REPOSITORY) private readonly repository: typeof OrderDetail
}
