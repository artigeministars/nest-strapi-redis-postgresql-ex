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
import { CreateTablePlayerDto } from '../dto/create-table-player.dto';
import { TablePlayer } from './table-player.entity';
import { TablePlayersService } from './table-players.service';

@Controller('table_players')
export class TablePlayersController {
  constructor(private readonly tablePlayersService: TablePlayersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createTablePlayerDto: CreateTablePlayerDto): Promise<TablePlayer> {
    return this.tablePlayersService.create(createTablePlayerDto);
  }

  @Get()
  findAll(): Promise<TablePlayer[]> {
    return this.tablePlayersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TablePlayer | null> {
    return this.tablePlayersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tablePlayersService.remove(id);
  }
}