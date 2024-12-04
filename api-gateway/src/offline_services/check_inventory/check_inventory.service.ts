import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CheckInventoryDto } from "./dto/check-invenoty-dto.dto";
import { CheckInventoryFilter } from "./dto/check-iventory-filter.dto";
import { Op } from "sequelize";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class CheckInventoryService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}


  // async onModuleInit() {
  //   this.offlineClient.subscribeToResponseOf('list-check-inventory');
  //   this.offlineClient.subscribeToResponseOf('detail-check-inventory');
  //   this.offlineClient.subscribeToResponseOf('create-check-inventory');
  //   this.offlineClient.subscribeToResponseOf('edit-check-inventory');
  //   this.offlineClient.subscribeToResponseOf('delete-check-inventory');
  //   this.offlineClient.subscribeToResponseOf('check-valid-material-check-inventory');
  //   await this.offlineClient.connect();
  // }

  
  async get(pagination: any, filter: CheckInventoryFilter) {
    const data = await this.offlineClient.send('list-check-inventory', { pagination, filter }).toPromise();
    return data;
  }


  async getById(id: number) {
    const response = await this.offlineClient.send('detail-check-inventory', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found check-inventory", status: 404 })
    return response
  }

  async create(infoCreate: CheckInventoryDto) {
    const response = await this.offlineClient.send('create-check-inventory', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit(id: number, infoEdit: CheckInventoryDto) {
    const response = await this.offlineClient.send('edit-check-inventory', {
      id: id, 
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async delete(id: number) {
    const response = await this.offlineClient.send('delete-check-inventory', { id }).toPromise()
    return response
  }

  async synchronizedWarehouse(id_check_inventory: number) {
    const response = await this.offlineClient.send('delete-check-inventory', { id: id_check_inventory }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found check-inventory", status: 404 })
    return response
  }
}
