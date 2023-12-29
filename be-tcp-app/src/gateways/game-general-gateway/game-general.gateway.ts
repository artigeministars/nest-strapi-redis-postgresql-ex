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
import { GameGeneralSocketService } from  './game-general-socket.service';
import { Logger } from '@nestjs/common';

/*
@WebSocketGateway(3015, {
					cors: {
					  origin: '*',
					  methods: ['GET', 'POST','PUT','PATCH','OPTIONS'],
					  transports: ['websocket', 'polling'],
					  credentials: false,
					},
				   allowEIO4: true,
})
*/
@WebSocketGateway()
export class GameGeneralGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect  {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gameGeneralSocketService: GameGeneralSocketService) {}

  private logger = new Logger('GameGeneralGateway');


  @SubscribeMessage('opentable')
  findAll(@MessageBody() data: any, @ConnectedSocket() client: Socket): WsResponse<any> {
  this.logger.log('open table request received');
    const event = 'opentable';
    this.server.emit("opentable",{ msg: "dsfsdfsfsdf"});
    return { event, data };
  }

  @SubscribeMessage('time')
  async identity(@MessageBody() data: unknown): Promise<any> {
    const event = 'time';
    return { event, data };
  }

  afterInit(server: any) {
  	this.logger.log(`GameGeneralGateway WebSocket listening!`);
  }

  handleConnection(client: any) {
  	this.logger.log('GameGeneralGateway handle Connection');
  }

  handleDisconnect(client: any) {
  	this.logger.log('GameGeneralGateway handle Disconnect');
  }
}