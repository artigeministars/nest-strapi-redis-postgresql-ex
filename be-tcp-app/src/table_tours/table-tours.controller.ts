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
import { CreateTableTourDto } from '../dto/create-table-tour.dto';
import { TableTour } from './table-tour.entity';
import { TableToursService } from './table-tours.service';

@Controller('table_tours')
export class TableToursController {
  constructor(private readonly tableToursService: TableToursService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createTableTourDto: CreateTableTourDto): Promise<TableTour> {
    return this.tableToursService.create(createTableTourDto);
  }

  @Get()
  findAll(): Promise<TableTour[]> {
    return this.tableToursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TableTour | null> {
    return this.tableToursService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tableToursService.remove(id);
  }
}