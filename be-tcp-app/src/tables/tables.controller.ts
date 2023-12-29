import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
  ParseIntPipe,
  ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { CreateTableDto } from '../dto/create-table.dto';
import { UpdateTableDto } from '../dto/update-table.dto';
import { Tables } from './table.entity';
import { TablesService } from './tables.service';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createTableDto: CreateTableDto): Promise<Tables> {
    return this.tablesService.create(createTableDto);
  }

  @Get()
  findAll(): Promise<Tables[] | null> {
    return this.tablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Tables | null> {
    return this.tablesService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
    update(@Param('id', ParseIntPipe) id: number, @Body() updateTableDto: UpdateTableDto): Promise<any> {
      return this.tablesService.update(id, updateTableDto!);
    }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tablesService.remove(id);
  }
}