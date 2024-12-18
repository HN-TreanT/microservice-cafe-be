import {  Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OfflineServiceServices {
  constructor(
    @Inject('OFFLINE_SERVICES') private readonly offlineClient: ClientKafka
  ) {}

  async onModuleInit() {
    //category
    this.offlineClient.subscribeToResponseOf('list-category');
    this.offlineClient.subscribeToResponseOf('detail-category');
    this.offlineClient.subscribeToResponseOf('create-category');
    this.offlineClient.subscribeToResponseOf('edit-category');
    this.offlineClient.subscribeToResponseOf('delete-category');

    //combo
    this.offlineClient.subscribeToResponseOf('list-combo');
    this.offlineClient.subscribeToResponseOf('detail-combo');
    this.offlineClient.subscribeToResponseOf('create-combo');
    this.offlineClient.subscribeToResponseOf('edit-combo');
    this.offlineClient.subscribeToResponseOf('delete-combo');
    this.offlineClient.subscribeToResponseOf('check-valid-material-combo');

    this.offlineClient.subscribeToResponseOf('list-check-inventory');
    this.offlineClient.subscribeToResponseOf('detail-check-inventory');
    this.offlineClient.subscribeToResponseOf('create-check-inventory');
    this.offlineClient.subscribeToResponseOf('edit-check-inventory');
    this.offlineClient.subscribeToResponseOf('delete-check-inventory');
    this.offlineClient.subscribeToResponseOf('check-valid-material-check-inventory');

    this.offlineClient.subscribeToResponseOf('list-customer');
    this.offlineClient.subscribeToResponseOf('detail-customer');
    this.offlineClient.subscribeToResponseOf('create-customer');
    this.offlineClient.subscribeToResponseOf('edit-customer');
    this.offlineClient.subscribeToResponseOf('delete-customer');

    this.offlineClient.subscribeToResponseOf('list-detail-combo');
    this.offlineClient.subscribeToResponseOf('detail-detail-combo');
    this.offlineClient.subscribeToResponseOf('create-detail-combo');
    this.offlineClient.subscribeToResponseOf('edit-detail-combo');
    this.offlineClient.subscribeToResponseOf('delete-detail-combo');

    this.offlineClient.subscribeToResponseOf('list-detail-shipment');
    this.offlineClient.subscribeToResponseOf('detail-detail-shipment');
    this.offlineClient.subscribeToResponseOf('create-detail-shipment');
    this.offlineClient.subscribeToResponseOf('edit-detail-shipment');
    this.offlineClient.subscribeToResponseOf('delete-detail-shipment');

    this.offlineClient.subscribeToResponseOf('list-check-inventor');
    this.offlineClient.subscribeToResponseOf('detail-check-inventor');
    this.offlineClient.subscribeToResponseOf('create-check-inventor');
    this.offlineClient.subscribeToResponseOf('edit-check-inventor');
    this.offlineClient.subscribeToResponseOf('delete-check-inventor');

    this.offlineClient.subscribeToResponseOf('list-employee');
    this.offlineClient.subscribeToResponseOf('detail-employee');
    this.offlineClient.subscribeToResponseOf('create-employee');
    this.offlineClient.subscribeToResponseOf('edit-employee');
    this.offlineClient.subscribeToResponseOf('delete-employee');

    this.offlineClient.subscribeToResponseOf('list-invoice');
    this.offlineClient.subscribeToResponseOf('detail-by-id-table');
    this.offlineClient.subscribeToResponseOf('detail-invoice');
    this.offlineClient.subscribeToResponseOf('create-invoice');
    this.offlineClient.subscribeToResponseOf('edit-invoice');
    this.offlineClient.subscribeToResponseOf('delete-invoice');
    this.offlineClient.subscribeToResponseOf('split-order');
    this.offlineClient.subscribeToResponseOf('combine-inovice');
    this.offlineClient.subscribeToResponseOf('over-view');
    this.offlineClient.subscribeToResponseOf('revenue-overview');
    this.offlineClient.subscribeToResponseOf('payment');

    this.offlineClient.subscribeToResponseOf('list-invoice-detail');
    this.offlineClient.subscribeToResponseOf('detail-invoice-detail');
    this.offlineClient.subscribeToResponseOf('create-invoice-detail');
    this.offlineClient.subscribeToResponseOf('edit-invoice-detail');
    this.offlineClient.subscribeToResponseOf('delete-invoice-detail');

    this.offlineClient.subscribeToResponseOf('list-material');
    this.offlineClient.subscribeToResponseOf('detail-material');
    this.offlineClient.subscribeToResponseOf('create-material');
    this.offlineClient.subscribeToResponseOf('edit-material');
    this.offlineClient.subscribeToResponseOf('delete-material');

    this.offlineClient.subscribeToResponseOf('list-position');
    this.offlineClient.subscribeToResponseOf('detail-position');
    this.offlineClient.subscribeToResponseOf('create-position');
    this.offlineClient.subscribeToResponseOf('delete-position');

    this.offlineClient.subscribeToResponseOf('list-product');
    this.offlineClient.subscribeToResponseOf('detail-product');
    this.offlineClient.subscribeToResponseOf('create-product');
    this.offlineClient.subscribeToResponseOf('edit-product');
    this.offlineClient.subscribeToResponseOf('delete-product');
    this.offlineClient.subscribeToResponseOf('check-valid-material-product');

    this.offlineClient.subscribeToResponseOf('list-promotion');
    this.offlineClient.subscribeToResponseOf('detail-promotion');
    this.offlineClient.subscribeToResponseOf('create-promotion');
    this.offlineClient.subscribeToResponseOf('edit-promotion');
    this.offlineClient.subscribeToResponseOf('delete-promotion');

    this.offlineClient.subscribeToResponseOf('list-shipment');
    this.offlineClient.subscribeToResponseOf('detail-shipment');
    this.offlineClient.subscribeToResponseOf('create-shipment');
    this.offlineClient.subscribeToResponseOf('edit-shipment');
    this.offlineClient.subscribeToResponseOf('delete-shipment');

    this.offlineClient.subscribeToResponseOf('list-supplier');
    this.offlineClient.subscribeToResponseOf('detail-supplier');
    this.offlineClient.subscribeToResponseOf('create-supplier');
    this.offlineClient.subscribeToResponseOf('edit-supplier');
    this.offlineClient.subscribeToResponseOf('delete-supplier');

    this.offlineClient.subscribeToResponseOf('list-table-food');
    this.offlineClient.subscribeToResponseOf('detail-table-food');
    this.offlineClient.subscribeToResponseOf('create-table-food');
    this.offlineClient.subscribeToResponseOf('edit-table-food');
    this.offlineClient.subscribeToResponseOf('delete-table-food');

    this.offlineClient.subscribeToResponseOf('list-tablefood-invoice');
    this.offlineClient.subscribeToResponseOf('detail-tablefood-invoice');
    this.offlineClient.subscribeToResponseOf('create-tablefood-invoice');
    this.offlineClient.subscribeToResponseOf('edit-tablefood-invoice');
    this.offlineClient.subscribeToResponseOf('delete-tablefood-invoice');

    this.offlineClient.subscribeToResponseOf('list-use-material');
    this.offlineClient.subscribeToResponseOf('detail-use-material');
    this.offlineClient.subscribeToResponseOf('create-use-material');
    this.offlineClient.subscribeToResponseOf('edit-use-material');
    this.offlineClient.subscribeToResponseOf('delete-use-material');
    this.offlineClient.subscribeToResponseOf('create-many-use-material');

    this.offlineClient.subscribeToResponseOf('list-workshift');
    this.offlineClient.subscribeToResponseOf('detail-workshift');
    this.offlineClient.subscribeToResponseOf('create-workshift');
    this.offlineClient.subscribeToResponseOf('edit-workshift');
    this.offlineClient.subscribeToResponseOf('delete-workshift');

    this.offlineClient.subscribeToResponseOf('complete-invoice');
    await this.offlineClient.connect();

    
  }

  
}
