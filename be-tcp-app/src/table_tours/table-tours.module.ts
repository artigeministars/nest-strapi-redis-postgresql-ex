import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableToursService } from './table-tours.service';
import { TableToursController } from './table-tours.controller';
import { TableTour } from './table-tour.entity';
import { TableTourSubscriber } from './table-tour.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([TableTour])],
  providers: [ TableToursService, TableTourSubscriber ],
  controllers: [TableToursController],
  exports: [TypeOrmModule]
})
export class TableToursModule {}