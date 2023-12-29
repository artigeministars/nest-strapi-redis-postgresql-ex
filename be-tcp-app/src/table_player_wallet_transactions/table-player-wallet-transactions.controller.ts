import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
    ValidationPipe,
    UsePipes
} from "@nestjs/common";
import { CreateTablePlayerWalletTransactionDto } from "../dto/create-table-player-wallet-transaction.dto";
import { TablePlayerWalletTransaction } from "./table-player-wallet-transactions.entity";
import { TablePlayerWalletTransactionsService } from "./table-player-wallet-transactions.service";

@Controller("tablePlayerWalletTransaction")
export class TablePlayerWalletTransactionsController {
    constructor(private readonly tablePlayerWalletTransactionsService : TablePlayerWalletTransactionsService ) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() createTablePlayerWalletTransactionDto: CreateTablePlayerWalletTransactionDto): Promise<TablePlayerWalletTransaction> {
        return this.tablePlayerWalletTransactionsService.create(createTablePlayerWalletTransactionDto);
    }

    @Get(':id')
    findOne(@Param("id", ParseIntPipe) id: number) : Promise<TablePlayerWalletTransaction | null> {
        return this.tablePlayerWalletTransactionsService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) : Promise<void> {
        return this.tablePlayerWalletTransactionsService.remove(id);
    }

}