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
import { EnterGameType } from './enter-game-type';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket', 'polling'],
})
export class GameTableGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect  {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gameTableSocketService: GameTableSocketService) {}

  private logger = new Logger('GameTableGateway');

 /*
  @SubscribeMessage('open.table')
  openTable(@MessageBody() data: any, @ConnectedSocket() client: Socket): any {
  this.logger.log(`hello connected ${client.id}`);
  // this.logger.log(JSON.stringify(client));
   const event = "open.table";
   this.server.emit("start.table", { client: client.id, name: client.handshake });

    // client.to(client.id).emit('start.table', {
    //    from: client.id,
    //    message: data.message,
    //  });
  return { event, data };
   // return from([1, 2, 3]).pipe(map(item => ({ event: 'hello', data: item })));
  }
  */
  @SubscribeMessage('create.table')
  async createTableSignal(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<any> {
    let tableId = data.data.table_id;
    await this.gameTableSocketService.tableCreation(client, tableId);
    // const event = 'create.table';
    // return { event, data };
  }

  @SubscribeMessage('enter.game') // buraya gene table_id gelecek sadece
    async enterTableSignal(@MessageBody() data: EnterGameType, @ConnectedSocket() client: Socket): Promise<any> {
      this.logger.log(" received from enter.game data ",data);
      this.gameTableSocketService.enterGame(client, data);
      // const event = 'create.table';
      // return { event, data };
    }

   @SubscribeMessage('enter.game.status') // buraya gene table_id gelecek sadece
       async enterTableStatusSignal(@MessageBody() data: any, @ConnectedSocket() client: Socket): Promise<any> {
         this.logger.log(" enter.game.status from client ",data);
         this.server.emit("enter.game.status",data);
         // this.gameTableSocketService.enterGame(client, data);
         // const event = 'create.table';
         // return { event, data };
   }

  afterInit(server: any) {
  	this.logger.log(`GameTableGateway WebSocket listening!`);
  }

  handleConnection(client: any) {
  	this.logger.log('GameTableGateway handle Connection');
  }

  handleDisconnect(client: any) {
  	this.logger.log('GameTableGateway handle Disconnect');
  }
}