import { Controller } from '@nestjs/common';
import { ShipmentOnlineService } from './shipment_online.service';

@Controller('shipment_online')
export class ShipmentOnlineController {
    constructor(private readonly service: ShipmentOnlineService) {}
}
