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
import { GameTableSocketService } from './game-table-socket.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
   transports: ['websocket', 'polling'],
})
export class GameTableMovesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect  {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gameTableSocketService: GameTableSocketService) {}

  private logger = new Logger('GameTableMovesGateway');


  @SubscribeMessage('hello')
  findAll(@MessageBody() data: any, @ConnectedSocket() client: Socket): Observable<WsResponse<number>> {
  this.logger.log('hello connected');
    return from([1, 2, 3]).pipe(map(item => ({ event: 'hello', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: unknown): Promise<any> {
    const event = 'events';
    return { event, data };
  }

  afterInit(server: any) {
  	this.logger.log(`GameTableMovesGateway WebSocket listening!`);
  }

  handleConnection(client: any) {
  	this.logger.log('GameTableMovesGateway handle Connection');
  }

  handleDisconnect(client: any) {
  	this.logger.log('GameTableMovesGateway handle Disconnect');
  }
}