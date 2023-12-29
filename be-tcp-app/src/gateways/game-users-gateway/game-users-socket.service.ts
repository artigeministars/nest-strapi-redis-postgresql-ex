import { Injectable, Logger,Inject, InternalServerErrorException } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from "axios";
import { HttpService } from "@nestjs/axios";
import { getTableUrl } from "../../conts/apiPaths";
import { axios_bearer_token } from "../../conts/axios";
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { CreateTableDto } from "../../dto/create-table.dto";


@Injectable()
export class GameUsersSocketService {
  private readonly connectedClients: Map<string, Socket> = new Map();
  private logger = new Logger('GameUsersSocketService');
  private server : Server;

  constructor(private readonly httpService: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async handleKavResponse(data: any, socket: Socket): Promise<void> {
  this.logger.log("GameUsersSocketService handleKavResponse");
  this.logger.log("GameUsersSocketService handleKavResponse data ",data);
  this.logger.log("GameUsersSocketService handleKavResponse data ",data.data.status);
  this.logger.log("GameUsersSocketService handleKavResponse socket id  ",socket.id);
  // const dataVal = { status: 200, message: "message received ..... 1  " };
  // this.server!.emit("get.kav.response", dataVal);
  let tableKey = "table" + data.data.table_id;
  var gameTableClass = await this.getRedisKey(tableKey);
        gameTableClass.game_table_status = "Kav_stage";
        let kav_counter = gameTableClass.kav_count;
                this.logger.log("GameUsersSocketService handleKavResponse kav_counter  ",kav_counter);
                    if(kav_counter == null || typeof kav_counter == "undefined"){
                       kav_counter = 0;
                    }
        gameTableClass.kav_count = kav_counter + 1;

      if(data.data.status === 200) {
        this.logger.log("GameUsersSocketService handleKavResponse gameTableClass  ",gameTableClass);
        let pCount = gameTableClass.players_count;
        this.logger.log("GameUsersSocketService handleKavResponse pCount  ",pCount);
            if(pCount == null || typeof pCount == "undefined"){
               pCount = 0;
            }
        gameTableClass.players_count = pCount + 1;

        if(gameTableClass.user_1_id == data.data.uId){
        // wallet eksiltilecek servis çağrılıp yeni değer wallet a set edilecek
        // gameTableClass.user_1_status
            if(data.data.kav_amount >= gameTableClass.game_table_kav ){
                gameTableClass.user_1_socket_id = socket.id;
                gameTableClass.user_1_kav = data.data.kav_amount;
                gameTableClass.user_1_status = "active";
                this.logger.log("gameTableClass  user1",gameTableClass);
            }
        }
        if(gameTableClass.user_2_id == data.data.uId){
                // gameTableClass.user_1_status
                    if(data.data.kav_amount >= gameTableClass.game_table_kav ){
                        gameTableClass.user_2_socket_id = socket.id;
                        gameTableClass.user_2_kav = data.data.kav_amount;
                        gameTableClass.user_2_status = "active";
                        this.logger.log("gameTableClass  user2",gameTableClass);
                    }
        }
        if(gameTableClass.user_3_id == data.data.uId){
                // gameTableClass.user_1_status
                    if(data.data.kav_amount >= gameTableClass.game_table_kav ){
                        gameTableClass.user_3_socket_id = socket.id;
                        gameTableClass.user_3_kav = data.data.kav_amount;
                        gameTableClass.user_3_status = "active";
                        this.logger.log("gameTableClass  user3",gameTableClass);
                    }
        }
        if(gameTableClass.user_4_id == data.data.uId){
                // gameTableClass.user_1_status
                    if(data.data.kav_amount >= gameTableClass.game_table_kav ){
                        gameTableClass.user_4_socket_id = socket.id;
                        gameTableClass.user_4_kav = data.data.kav_amount;
                        gameTableClass.user_4_status = "active";
                        this.logger.log("gameTableClass  user4",gameTableClass);
                    }
        }
      }
      if(data.data.status == 400){
         this.logger.log("GameUsersSocketService handleKavResponse rejection  ",data);
          if(gameTableClass.user_1_id == data.data.uId){
                 // gameTableClass.user_1_status
                         gameTableClass.user_1_socket_id = socket.id;
                         gameTableClass.user_1_status = "passive";
                         this.logger.log("gameTableClass  user1 r ",gameTableClass);
                 }
                 if(gameTableClass.user_2_id == data.data.uId){
                         // gameTableClass.user_1_status
                                 gameTableClass.user_2_socket_id = socket.id;
                                 gameTableClass.user_2_status = "passive";
                                 this.logger.log("gameTableClass  user2 r ",gameTableClass);
                 }
                 if(gameTableClass.user_3_id == data.data.uId){
                         // gameTableClass.user_1_status
                                 gameTableClass.user_3_socket_id = socket.id;
                                 gameTableClass.user_3_status = "passive";
                                 this.logger.log("gameTableClass  user3 r ",gameTableClass);
                 }
                 if(gameTableClass.user_4_id == data.data.uId){
                         // gameTableClass.user_1_status
                                 gameTableClass.user_4_socket_id = socket.id;
                                 gameTableClass.user_4_status = "passive";
                                 this.logger.log("gameTableClass  user4 r ",gameTableClass);
                 } // todo: else handle
      }
      if(gameTableClass.kav_count <= 3){
      this.cacheManager.del(tableKey.toString());
      this.cacheManager.set(tableKey.toString(), gameTableClass, 0);
      }

       if(gameTableClass.kav_count === 4 && gameTableClass.players_count >= 2){
         this.server.emit("get.kav.response", { status: 200, message: "kav amount received successfully"});
         this.server.emit("get.kav.response", { status: 200, message: `Current player count ${gameTableClass.players_count }`});
                let createTableDto = new CreateTableDto();
               createTableDto.config = 0;
               createTableDto.status = 1; // kav_stage
               createTableDto.parent_id = gameTableClass.game_table_id;
               createTableDto.created_at = new Date();
               createTableDto.created_by_id = 1;
               // createTableDto.updated_by_id = 1;
               let createdTable : any = await this.createTable(createTableDto);
               this.logger.log("GameUsersSocketService handleKavResponse createdTable  ",createdTable);
                if(createdTable != null && typeof createdTable !="undefined"){
                    gameTableClass.game_table_parent_id =  gameTableClass.game_table_id;
                    gameTableClass.game_table_id        =  createdTable.id;
                }
                /*
                                createTableDto.config = 1;
                              createTableDto.status = 2; // kav_stage
                              createTableDto.parent_id = gameTableClass.game_table_id;
                              createTableDto.created_at = new Date();
                              createTableDto.created_by_id = 2;
               await this.updateTable(createTableDto,9);
            */
        this.cacheManager.del(tableKey.toString());
        this.cacheManager.set(tableKey.toString(), gameTableClass, 0);
       this.server.emit("get.kav.response", { status: 200, message: "Table Data inserted"});

       }
  }

  async createTable(tableData: any) {

    let path = "http://localhost:3000/tables";
    this.logger.log(" path ",path);
     this.logger.log(" tableData ",tableData);
    // @ts-ignore
    const { data } = await firstValueFrom(
    	this.httpService.post<any[]>(path.toString(),tableData).pipe(
    	catchError((error: AxiosError) => {
    	this.logger.error(error.response!.data);
    	throw 'An error happened!';
    	}),
    	),
    	);
    	return data;
  }

  async updateTable(tableData: any, id: number) {

      let path = "http://localhost:3000/tables/"+ id;
      this.logger.log(" path ",path);
       this.logger.log(" tableData ",tableData);
      // @ts-ignore
      const { data } = await firstValueFrom(
      	this.httpService.put<any[]>(path.toString(),tableData).pipe(
      	catchError((error: AxiosError) => {
      	this.logger.error(error.response!.data);
      	throw 'An error happened!';
      	}),
      	),
      	);
      	return data;
    }

  handleConnection(socket: Socket): void {
    this.logger.log("GameUsersSocketService handleConnection");

    const clientId = socket.id;
    this.connectedClients.set(clientId, socket);

    socket.on('disconnect', () => {
      this.connectedClients.delete(clientId);
    });

    // Handle other events and messages from the client
  }

  init(server: Server): void {
  this.server = server;
  }

  async getRedisKey(key: string): Promise<any> {
          try {
            return await this.cacheManager.get(key);
          } catch (error) {
            throw new InternalServerErrorException();
          }
  }

  // Add more methods for handling events, messages, etc.
}