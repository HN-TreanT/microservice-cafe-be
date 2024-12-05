import { Controller } from '@nestjs/common';
import {OrderDetailService } from './order_detail.service';

@Controller('order_detail')
export class OrderDetailController {
    constructor(private readonly service: OrderDetailService) {}
}
