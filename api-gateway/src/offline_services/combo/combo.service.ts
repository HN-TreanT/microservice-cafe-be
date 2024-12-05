import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { ComboCreate } from "./dto/combo-create.dto";
import { ComboEdit } from "./dto/combo-edit.dto";

@Injectable()
export class ComboService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  async get(pagination: any, filter: any) {
    const data = await this.offlineClient.send('list-combo', { pagination, filter}).toPromise();
    return data;
  }

  async getById(id: number){
    const response = await this.offlineClient.send('detail-combo', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found combo", status: 404 })
    return response
  }

  async create(infoCreate: ComboCreate) {
    const response = await this.offlineClient.send('create-combo', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit(id: number, infoEdit: ComboEdit){
    const response = await this.offlineClient.send('edit-combo', {
      id: id, 
      infoEdit: infoEdit
    }).toPromise();
    return response

  }

  async deleteById(id: number) {
    const response = await this.offlineClient.send('delete-combo', { id }).toPromise()
    return response
  }

  async checkValidMaterial(amount: number, id_combo: number) {
    const response = await this.offlineClient.send('check-valid-material-combo', { 
      amount: amount, 
      id_combo: id_combo
     }).toPromise()
    return response
  }
}
