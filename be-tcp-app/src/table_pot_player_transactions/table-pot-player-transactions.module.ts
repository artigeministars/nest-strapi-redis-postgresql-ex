import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TablePotPlayerTransactionsService } from './table-pot-player-transactions.service';
import { TablePotPlayerTransactionsController } from './table-pot-player-transactions.controller';
import { TablePotPlayerTransaction } from './table-pot-player-transaction.entity';
import { TablePotPlayerTransactionSubscriber } from './table-pot-player-transaction.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([TablePotPlayerTransaction])],
  providers: [ TablePotPlayerTransactionsService, TablePotPlayerTransactionSubscriber ],
  controllers: [TablePotPlayerTransactionsController],
  exports: [TypeOrmModule]
})
export class TablePotPlayerTransactionsModule {}