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
} from '@nestjs/common';
import { CreateTablePotPlayerTransactionDto } from '../dto/create-table-pot-player-transaction.dto';
import { TablePotPlayerTransaction } from './table-pot-player-transaction.entity';
import { TablePotPlayerTransactionsService } from './table-pot-player-transactions.service';

@Controller('table_pot_player_transactions')
export class TablePotPlayerTransactionsController {
  constructor(private readonly tablePotPlayerTransactionsService: TablePotPlayerTransactionsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createTablePotPlayerTransactionDto: CreateTablePotPlayerTransactionDto): Promise<TablePotPlayerTransaction> {
    return this.tablePotPlayerTransactionsService.create(createTablePotPlayerTransactionDto);
  }

  @Get()
  findAll(): Promise<TablePotPlayerTransaction[]> {
    return this.tablePotPlayerTransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TablePotPlayerTransaction | null> {
    return this.tablePotPlayerTransactionsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe ) id: number): Promise<void> {
    return this.tablePotPlayerTransactionsService.remove(id);
  }
}