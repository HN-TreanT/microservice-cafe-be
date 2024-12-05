import { Inject, Injectable } from '@nestjs/common';
import { SHIPMENT_ONLINE_REPOSITORY } from 'src/constants/repository_enum';
import { ShipmentOnline } from 'src/entities/shipment_online.entity';

@Injectable()
export class ShipmentOnlineService {
    @Inject(SHIPMENT_ONLINE_REPOSITORY) private readonly repository: typeof ShipmentOnline
}
