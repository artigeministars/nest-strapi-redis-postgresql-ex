import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Logger,Inject } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from "axios";
import { HttpService } from "@nestjs/axios";
import { getTableUrl } from "../../conts/apiPaths";
import { axios_bearer_token } from "../../conts/axios";
import { GameTable } from "../../game_table/game-table";
import { GameTableMovesHistory } from "../../game_table/game-table-moves-history";
import { EnterGameType } from './enter-game-type';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from "@nestjs/cache-manager";

/*
export class MapRecord {
    table_id: number;
    tableSocket: Socket;
    tableSocketId: string;
}
*/
export class EnterResponse {

    status: number;
    message: string;
    data: Record<string,any>;
    user_count: number;
}


@Injectable()
export class GameTableSocketService {
  private readonly connectedTables: Map<number, any> = new Map();
   private logger = new Logger('GameTableSocketService');

    constructor(private readonly httpService: HttpService, @Inject(CACHE_MANAGER) private cacheManager: Cache ) {}

  handleConnection(tableSocket: Socket): void {
    this.logger.log(" table creation handleConnection");
    // await this.cacheManager.set('key', 'value', 1000);

    tableSocket.on('disconnect', () => {
     // this.connectedClients.delete(clientId);
     // console.log(" create.table socket disconnected ");
     this.logger.log(`GameTableSocketService create.table socket disconnected`);
    });

    // Handle other events and messages from the client
  }

  tableCreation(tableSocket: Socket, tableId: number): void {
    // console.log(" socket id ",socket.id," data ",data);
     this.logger.log(" socket id ",tableSocket.id," tableId ",tableId);
     const clientId = tableSocket.id;
     const gameTableClass : GameTable = this.initTableClass();

     gameTableClass.game_table_socket_id = tableSocket.id;
     gameTableClass.game_table_id = tableId;
     gameTableClass.game_table_status = "Player waiting";
     gameTableClass.players_count = 0;
     gameTableClass.total_players = 0;
     gameTableClass.tour_count = 0;
     this.cacheManager.set("socket_id", tableSocket.id, 0);
     let tableKey = "table"+tableId;
     this.cacheManager.set(tableKey.toString(), gameTableClass, 0);
     /*
     let socketObject = { table_id: tableId,
                          tableSocket: tableSocket,
                          tableSocketId: tableSocket.id
                        };
     */
     this.connectedTables.set(tableId, gameTableClass);
     // let cacheValue = this.cacheManager.get("test");
     // let jsonData: any | undefined = null;
     // jsonData = this.getRedisKey("test");
        /*
     this.logger.log(" redis val ",jsonData.then((data: any) => {
                                              console.log(data)
                                            })
                                            .catch((err: any) => {
                                              console.log(err)
                                            }));
    */
  }

  // async enterGame(tableSocket: Socket, dataVal: EnterGameType ): Promise<any[]> {
   async enterGame(tableSocket: Socket, dataVal: any ): Promise<void> {
      let gameTableClass : GameTable | undefined = undefined;
      let tableKey : string | undefined = undefined;
      if( dataVal.data.data[0].id != null && typeof dataVal.data.data[0].id != "undefined") {
      tableKey = "table"+dataVal.data.data[0].id;
       // let gameTable = await this.getRedisKey(tableKey.toString());
       gameTableClass = await this.getRedisKey(tableKey.toString());
       this.logger.log(" enter.game gameTable 2 ",gameTableClass);
       /*
       gameTable.then((data: any) => {
           gameTableClass = data;
       }).catch((err: any) => {
         console.log(err)
       });
       */
      //  gameTableClass = this.connectedTables.get(dataVal.data.data[0]!.id);

      this.logger.log(" enter.game dataVal.data.id ",dataVal.data.data[0].id);

      let data = await this.getRequest(dataVal.data.data[0].id);

      this.logger.log(" enter.game data ",data);
        this.gameTableInit(gameTableClass,data, tableKey, tableSocket);


      } // todo: else te exception

   // todo: gerekli set işlemleri yapıldıktan sonra kav kontrolü yapılacak.
   // burda user ları sayacaksın 4 olmalı.

   // return data ;
}

    async getRedisKey(key: string): Promise<any> {
        try {
          return await this.cacheManager.get(key);
        } catch (error) {
          throw new InternalServerErrorException();
        }
    }

    async getRequest(tableId: number) : Promise<any> {
      /*
      let path = getTableUrl + tableId;
            this.logger.log(" enter.game path ",path);
                        // @ts-ignore
                        const { data } = await firstValueFrom(
                        this.httpService.get<any[]>(path.toString(), {
                         headers: {
                           'Authorization': `Bearer ${axios_bearer_token}`
                         }
                        }).pipe(
                        catchError((error: AxiosError) => {
                        this.logger.error(error.response!.data);
                        throw 'An error happened!';
                       }),
                       ),
                     );
        return data;
        */
        let data = {
                       "status": 200,
                       "message": "",
                       "data": [
                           {
                               "id": 1,
                               "title": "table1",
                               "config": {
                                   "kav": "100.00",
                                   "maxCoin": "10000.00",
                                   "minCoin": "100.00"
                               },
                               "uIDs": [
                                   {
                                       "uId": "f9429b02-9dd4-11ee-bf02-0242ac130002",
                                       "seatingOrder": 1,
                                       "wallet": 217
                                   },
                                   {
                                       "uId": "bddcacd2-9dc6-11ee-b5cc-0242ac130002",
                                       "seatingOrder": 2,
                                       "wallet": 491
                                   },
                                   {
                                        "uId": "f9429b02-9dd4-11ee-bf02-0242ac130003",
                                        "seatingOrder": 3,
                                        "wallet": 210
                                   },
                                   {
                                         "uId": "bddcacd2-9dc6-11ee-b5cc-0242ac130007",
                                         "seatingOrder": 4,
                                         "wallet": 435
                                   }
                               ]
                           }
                       ],
                       "user_count": 4
                   };
        return data;
    }

    gameTableInit(gameTableClass: any, data: any, tableKey: any, tableSocket: Socket) {
    console.log(" gameTableClass ",gameTableClass);
             // @ts-ignore
             gameTableClass!.game_table_name = data.data[0].title;
             // @ts-ignore
             let users = data.data[0].uIDs;
             let loopUserCount = 0;
             users.forEach((user: any) => {
              if(user.seatingOrder === 1){
                  gameTableClass!.user_1_id = user.uId;
                  gameTableClass!.user_1_seating_order = user.seatingOrder;
                  gameTableClass!.user_1_wallet = user.wallet;
                  gameTableClass!.user_1_username = user.username;
                  gameTableClass!.D_user_id = user.uId;
                  loopUserCount++;
              } else if(user.seatingOrder === 2){
                  gameTableClass!.user_2_id = user.uId;
                  gameTableClass!.user_2_seating_order = user.seatingOrder;
                  gameTableClass!.user_2_wallet = user.wallet;
                  gameTableClass!.user_2_username = user.username;
                  loopUserCount++;
              } else if(user.seatingOrder === 3){
                  gameTableClass!.user_3_id = user.uId;
                  gameTableClass!.user_3_seating_order = user.seatingOrder;
                  gameTableClass!.user_3_wallet = user.wallet;
                  gameTableClass!.user_3_username = user.username;
                  loopUserCount++;
             } else if(user.seatingOrder === 4){
                  gameTableClass!.user_4_id = user.uId;
                  gameTableClass!.user_4_seating_order = user.seatingOrder;
                  gameTableClass!.user_4_wallet = user.wallet;
                  gameTableClass!.user_4_username = user.username;
                  loopUserCount++;
             }
             });
             // @ts-ignore
             let gameTableConfig = data.data[0]["config"];
                 gameTableClass!.game_table_kav      = gameTableConfig.kav;
                 gameTableClass!.game_table_min_coin = gameTableConfig.minCoin;
                 gameTableClass!.game_table_max_coin = gameTableConfig.maxCoin;
                 // @ts-ignore
             let userCount = data.user_count; // 4 olunca kontrol olacak
             // @ts-ignore
             gameTableClass.total_players = userCount;
             console.log(" gameTableClass after ",gameTableClass);
             this.logger.log(" user_count", userCount, " counted users ",loopUserCount);
             // if(userCount === 4 && loopUserCount === 4){
                       if(userCount === 4){
                         if(
                         gameTableClass!.user_1_id != null && typeof gameTableClass!.user_1_id != "undefined" &&
                         gameTableClass!.user_2_id != null && typeof gameTableClass!.user_2_id != "undefined" &&
                         gameTableClass!.user_3_id != null && typeof gameTableClass!.user_3_id != "undefined" &&
                         gameTableClass!.user_4_id != null && typeof gameTableClass!.user_4_id != "undefined" &&
                         gameTableClass!.user_1_wallet != null && typeof gameTableClass!.user_1_wallet != "undefined" &&
                         gameTableClass!.user_1_wallet >= gameTableClass!.game_table_min_coin &&
                         gameTableClass!.user_1_wallet <= gameTableClass!.game_table_max_coin &&
                         gameTableClass!.user_2_wallet != null && typeof gameTableClass!.user_2_wallet != "undefined" &&
                         gameTableClass!.user_2_wallet >= gameTableClass!.game_table_min_coin &&
                         gameTableClass!.user_2_wallet <= gameTableClass!.game_table_max_coin &&
                         gameTableClass!.user_3_wallet != null && typeof gameTableClass!.user_3_wallet != "undefined" &&
                         gameTableClass!.user_3_wallet >= gameTableClass!.game_table_min_coin &&
                         gameTableClass!.user_3_wallet <= gameTableClass!.game_table_max_coin &&
                         gameTableClass!.user_4_wallet != null && typeof gameTableClass!.user_4_wallet != "undefined" &&
                         gameTableClass!.user_4_wallet >= gameTableClass!.game_table_min_coin &&
                         gameTableClass!.user_4_wallet <= gameTableClass!.game_table_max_coin
                         ) {
                         console.log("kullanıcı sayısı");
                         this.cacheManager.del(tableKey.toString());
                         this.cacheManager.set(tableKey.toString(), gameTableClass, 0);
                         tableSocket.emit("enter.game.status", { status: 200, message: "Table Created Successfully!"});
                         // gameTableClass.players_count bu da set edilecek, kav sayımından sonra
                         } else {
                         tableSocket.emit("enter.game.status", { status: 300, message: "User Id or User Wallet or User Amount Error!"});
                         // throw new InternalServerErrorException("Game Table Control Enter Game ","User Id or User Wallet or User Amount Error");
                         }
                      } else { // bu event ile emit edilebilir.
                        tableSocket.emit("enter.game.status", { status: 301, message: "Users Low Than 4!"});
                        // throw new InternalServerErrorException("Game Table Control User Number ","Users Low Than 4");
                      }
                      this.logger.log(" gameTableClass ", JSON.stringify(gameTableClass));
    }

    initTableClass(): any {

    return {

                  game_table_socket_id: "",
                  game_table_moves_socket_id: "",
                  game_table_id: 0,
                  game_table_parent_id: 0,
                  game_table_name: "",
                  game_table_kav: 0,
                  game_table_min_coin: 0,
                  game_table_max_coin: 0,
                  game_table_pot: 0,
                  game_table_status: "",

                  game_order_user_id: 0,

                  user_1_id : "",
                  user_2_id : "",
                  user_3_id : "",
                  user_4_id : "",

                  user_1_username : "",
                  user_2_username : "",
                  user_3_username : "",
                  user_4_username : "",

                  user_1_wallet : 0,
                  user_2_wallet : 0,
                  user_3_wallet : 0,
                  user_4_wallet : 0,

                  user_1_kav : 0,
                  user_2_kav : 0,
                  user_3_kav : 0,
                  user_4_kav : 0,

                  user_1_status : "",
                  user_2_status : "",
                  user_3_status : "",
                  user_4_status : "",

                  user_1_current_move : "",
                  user_2_current_move : "",
                  user_3_current_move : "",
                  user_4_current_move : "",

                  user_1_socket_id : "",
                  user_2_socket_id : "",
                  user_3_socket_id : "",
                  user_4_socket_id : "",

                  user_1_seating_order : 0,
                  user_2_seating_order : 0,
                  user_3_seating_order : 0,
                  user_4_seating_order : 0,

                  current_active_user_id : 0,
                  players_count : 0,
                  kav_count: 0,
                  tour_count : 0,
                  total_players: 0,

                  winner_id : 0,
                  winner_score : 0,
                  winner_price : 0,

                  D_user_id: 0
                };
    }
  // Add more methods for handling events, messages, etc.
}