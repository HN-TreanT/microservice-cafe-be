import { Inject, Injectable } from '@nestjs/common';
import { PAYMENT_REPOSITORY } from 'src/constants/repository_enum';
import { Payment } from 'src/entities/payment.entity';

@Injectable()
export class PaymentService {
    @Inject(PAYMENT_REPOSITORY) private readonly repository: typeof Payment
}
