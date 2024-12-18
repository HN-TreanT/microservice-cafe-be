
import { Server, Socket } from "socket.io";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { InvoiceService } from "./invoice/invoice.service";

@WebSocketGateway({
    cors: {
        origin: "*",
    },
})

export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;
    constructor( 
      private readonly invoiceService: InvoiceService) {}
    async handleConnection(socket: Socket) {
      console.log("connection socket id: ", socket.id);
    }
    handleDisconnect(socket: Socket) {
      console.log(socket.id, socket.data.email);
    }
  
    afterInit(server: any) {}

    @SubscribeMessage("announce")
    async handleMessage(@MessageBody() data: any): Promise<any> {
      
      try {
        const res = await this.invoiceService.completeInvocie(data?.id_invoice)
        if(res) {
          this.server.emit("announce_success", {
            id_invoice: data.id_invoice,
            message:"success"
          })
        } else {
          this.server.emit("announce_success", {
            id_invoice: data.id_invoice,
            message:"error"
          })
        }
      
      } catch (err: any) {
        console.log(err)
        this.server.emit("announce_success", {
          id_invoice: data.id_invoice,
          message:"error"
        })
      }
    
    }
  
    @SubscribeMessage("change_order")
    async handleChangeOrder(@MessageBody() data: any) : Promise<any> {
      if(data?.status) this.server.emit("change_order_success", {
        status: true,
        table: data?.table ? data?.table : ""
      })
    }
}