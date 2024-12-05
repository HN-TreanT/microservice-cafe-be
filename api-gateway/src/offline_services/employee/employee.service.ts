import { Inject, Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import EmployeeCreate from "./dto/employee-create.dto";
import EmployeeUpdate from "./dto/employee-update.dto";
import { EmployeeFilter } from "./dto/employee-filter.dto";
@Injectable()
export class EmployeeService {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}
  async get (pagination: any, filter: EmployeeFilter) {
    const data = await this.offlineClient.send('list-employee', { pagination, filter }).toPromise();
    return data;
  }

  async getById (id: number) {
    const response = await this.offlineClient.send('detail-employee', { id }).toPromise()
    if (!response) throw new NotFoundException({ message: "not found employee", status: 404 })
    return response
  }

  async create (infoCreate: EmployeeCreate) {
    const response = await this.offlineClient.send('create-employee', JSON.stringify(infoCreate)).toPromise();
    return response
  }

  async edit (id: number, infoEdit: EmployeeUpdate) {
    const response = await this.offlineClient.send('edit-employee', {
      id: id,
      infoEdit: infoEdit
    }).toPromise();
    return response
  }

  async deleteById (id: number) {
    const response = await this.offlineClient.send('delete-employee', {id}).toPromise();
    return response
  }
}
