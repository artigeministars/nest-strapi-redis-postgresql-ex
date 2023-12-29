import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TablePlayerWalletTransactionsService } from "./table-player-wallet-transactions.service";
import { TablePlayerWalletTransactionsController } from "./table-player-wallet-transactions.controller";
import { TablePlayerWalletTransaction } from "./table-player-wallet-transactions.entity";
import { TablePlayerWalletTransactionSubscriber } from "./table-player-wallet-transaction.subscriber";

@Module({
    imports: [TypeOrmModule.forFeature([TablePlayerWalletTransaction])],
    providers: [ TablePlayerWalletTransactionsService , TablePlayerWalletTransactionSubscriber ],
    controllers: [ TablePlayerWalletTransactionsController ],
    exports: [TypeOrmModule]
})
export class TablePlayerWalletTransactionsModule { }