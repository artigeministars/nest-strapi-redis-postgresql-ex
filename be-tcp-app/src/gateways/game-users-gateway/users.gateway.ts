import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { GameUsersSocketService } from "./game-users-socket.service";

@WebSocketGateway()
export class UsersGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect  {
  /*
  @WebSocketServer()
  server: Server = new Server();
  */
  @WebSocketServer()
  server: Server;

  constructor(private readonly gameUsersSocketService: GameUsersSocketService) {}

  private logger = new Logger('UsersGateway');


  @SubscribeMessage('hello')
  findAll(@MessageBody() data: any, @ConnectedSocket() client: Socket): Observable<WsResponse<number>> {
  this.logger.log('hello connected');
    return from([1, 2, 3]).pipe(map(item => ({ event: 'hello', data: item })));
  }

  @SubscribeMessage('get.kav.response')
  async getKavResponse(@MessageBody() data: unknown, @ConnectedSocket() client: Socket ): Promise<any> {
     this.gameUsersSocketService.handleKavResponse(data,client);
     const event = 'get.kav.response';
     data = { status: 200, message: "message received" };
     return { event, data };
  }

  afterInit(server: any) {
  this.gameUsersSocketService.init(server);
  	this.logger.log(`UsersGateway WebSocket listening!`);
  }

  handleConnection(client: any) { // client === socket
  	this.logger.log('UsersGateway handle Connection');
  	this.gameUsersSocketService.handleConnection(client);
  }

  handleDisconnect(client: any) {
  	this.logger.log('UsersGateway handle Disconnect');
  }
}