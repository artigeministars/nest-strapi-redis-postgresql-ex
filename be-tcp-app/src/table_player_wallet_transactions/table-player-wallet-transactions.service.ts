import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository , Connection } from "typeorm";
import { TablePlayerWalletTransaction } from "./table-player-wallet-transactions.entity";
import { CreateTablePlayerWalletTransactionDto } from "../dto/create-table-player-wallet-transaction.dto";
import { validate } from "class-validator";

@Injectable()
export class TablePlayerWalletTransactionsService {

    constructor(@InjectRepository(TablePlayerWalletTransaction)
    private tablePlayerWalletTransactionRepository: Repository<TablePlayerWalletTransaction>, private connection: Connection ) {}

    findAll(): Promise<TablePlayerWalletTransaction[]> {
        return this.tablePlayerWalletTransactionRepository.find();
    }

    findOne(id: number): Promise<TablePlayerWalletTransaction | null> {
        return this.tablePlayerWalletTransactionRepository.findOneBy({ id });
    }

    async remove(id: number) : Promise<void> {
        await this.tablePlayerWalletTransactionRepository.delete(id);
    }

    async create(createTablePlayerWalletTransactionDto : CreateTablePlayerWalletTransactionDto) : Promise<TablePlayerWalletTransaction> {
        const tablePlayerWalletTransaction          = new TablePlayerWalletTransaction();
        tablePlayerWalletTransaction.table_id       = createTablePlayerWalletTransactionDto.table_id;
        tablePlayerWalletTransaction.player_id      = createTablePlayerWalletTransactionDto.player_id;
        tablePlayerWalletTransaction.amount         = createTablePlayerWalletTransactionDto.amount;
        tablePlayerWalletTransaction.table_tour_id  = createTablePlayerWalletTransactionDto.table_tour_id;
        tablePlayerWalletTransaction.transaction_id = createTablePlayerWalletTransactionDto.transaction_id;
        tablePlayerWalletTransaction.created_at     = createTablePlayerWalletTransactionDto.created_at;
        tablePlayerWalletTransaction.created_by_id  = createTablePlayerWalletTransactionDto.created_by_id;

        const errors = await validate(tablePlayerWalletTransaction)
        if (errors.length > 0) {
            throw new Error(`Validation failed! createTablePlayerWalletTransactionDto creation.`);
        } else {
            return this.tablePlayerWalletTransactionRepository.save(tablePlayerWalletTransaction);
        }

        // return this.tablePlayerWalletTransactionRepository.save(tablePlayerWalletTransaction);

    }

    async createMany( tablePlayerWalletTransactions : TablePlayerWalletTransaction[]) {

        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.save(tablePlayerWalletTransactions[0]);
            await queryRunner.manager.save(tablePlayerWalletTransactions[1]);

            await queryRunner.commitTransaction();

        } catch(err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }

    }
}