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
import { CreateTourStepDto } from '../dto/create-tour-step.dto';
import { TourStep } from './tour-step.entity';
import { TourStepsService } from './tour-steps.service';

@Controller('tour_steps')
export class TourStepsController {
  constructor(private readonly tourStepsService: TourStepsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createTourStepDto: CreateTourStepDto): Promise<TourStep> {
    return this.tourStepsService.create(createTourStepDto);
  }

  @Get()
  findAll(): Promise<TourStep[]> {
    return this.tourStepsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<TourStep | null> {
    return this.tourStepsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tourStepsService.remove(id);
  }
}