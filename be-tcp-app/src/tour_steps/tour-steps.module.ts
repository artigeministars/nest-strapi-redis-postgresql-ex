import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourStepsService } from './tour-steps.service';
import { TourStepsController } from './tour-steps.controller';
import { TourStep } from './tour-step.entity';
import { TourStepSubscriber } from './tour-step.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([TourStep])],
  providers: [ TourStepsService, TourStepSubscriber ],
  controllers: [TourStepsController],
  exports: [TypeOrmModule]
})
export class TourStepsModule {}