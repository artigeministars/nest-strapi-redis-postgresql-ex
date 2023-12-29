import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TablesModule } from "./tables/tables.module";
import { TablePlayerWalletTransactionsModule } from "./table_player_wallet_transactions/table-player-wallet-transactions.module";
import { TablePlayersModule } from "./table_players/table-players.module";
import { TableToursModule } from "./table_tours/table-tours.module";
import { TablePotPlayerTransactionsModule } from "./table_pot_player_transactions/table-pot-player-transactions.module";
import { TourStepsModule } from "./tour_steps/tour-steps.module";
import { GatewaysModule } from "./gateways/gateways.module";
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
// import type { RedisClientOptions } from 'redis';
// import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
  TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.NODE_ENV === "development" ? "db" : "db_prod",
      port: 5432,
      username: "turkpokeradmin",
      password: "turkpokeradmin",
      database: "pokeroyun",
      entities: [],
      autoLoadEntities: true,
      logging: true,
      synchronize: process.env.NODE_ENV === "development" ? true : false,
    }),
  ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local', '.env', '.env.prod'],
    }),
    TablesModule,
    TablePlayerWalletTransactionsModule,
    TablePlayersModule,
    TableToursModule,
    TablePotPlayerTransactionsModule,
    TourStepsModule,
    GatewaysModule,
    /*
    HttpModule.register({
       timeout: 5000,
       maxRedirects: 5,
    }),
    */
    CacheModule.register({
        isGlobal: true,
        store: redisStore,
        ttl: 86400000,
        // db: 0,
        host: process.env.NODE_ENV === "development" ? 'redis' : 'redis_prod',//default host
        port: 6379 ,//default port
        // url: 'redis://redis:6379',
    }),
    /*
    CacheModule.registerAsync({
        useFactory: () => ({
          ttl: 600000,
          isGlobal: true,
          store: redisStore,
          host: 'redis',
          port: '6379',
        }),
      }),
      */
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
