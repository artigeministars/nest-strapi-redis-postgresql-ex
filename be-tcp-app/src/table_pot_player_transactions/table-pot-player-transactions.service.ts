import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , Connection } from 'typeorm';
import { TablePotPlayerTransaction } from './table-pot-player-transaction.entity';
import { CreateTablePotPlayerTransactionDto } from "../dto/create-table-pot-player-transaction.dto";
import { validate } from "class-validator";

@Injectable()
export class TablePotPlayerTransactionsService {
  constructor(
    @InjectRepository(TablePotPlayerTransaction)
    private tablePotPlayerTransactionRepository: Repository<TablePotPlayerTransaction>, private connection : Connection
  ) {}

  findAll(): Promise<TablePotPlayerTransaction[]> {
    return this.tablePotPlayerTransactionRepository.find();
  }

  findOne(id: number): Promise<TablePotPlayerTransaction | null> {
    return this.tablePotPlayerTransactionRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.tablePotPlayerTransactionRepository.delete(id);
  }

  async  create(createTablePotPlayerTransactionDto: CreateTablePotPlayerTransactionDto): Promise<TablePotPlayerTransaction> {
        const tablePotPlayerTransaction                   = new TablePotPlayerTransaction();
        tablePotPlayerTransaction.table_id                = createTablePotPlayerTransactionDto.table_id;
        tablePotPlayerTransaction.wallet_transaction_id   = createTablePotPlayerTransactionDto.wallet_transaction_id;
        tablePotPlayerTransaction.pot_before              = createTablePotPlayerTransactionDto.pot_before;
        tablePotPlayerTransaction.pot_final               = createTablePotPlayerTransactionDto.pot_final;
        tablePotPlayerTransaction.created_at              = createTablePotPlayerTransactionDto.created_at;

        const errors = await validate(tablePotPlayerTransaction)
        if (errors.length > 0) {
            throw new Error(`Validation failed! createTablePotPlayerTransactionDto creation`);
        } else {
            return this.tablePotPlayerTransactionRepository.save(tablePotPlayerTransaction);
        }

        // return this.tablePotPlayerTransactionRepository.save(tablePotPlayerTransaction);
  }

  async createMany(tablePotPlayerTransactions: TablePotPlayerTransaction[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(tablePotPlayerTransactions[0]);
      await queryRunner.manager.save(tablePotPlayerTransactions[1]);

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}