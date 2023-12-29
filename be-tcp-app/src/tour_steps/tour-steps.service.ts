import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , Connection } from 'typeorm';
import { TourStep } from './tour-step.entity';
import { CreateTourStepDto } from "../dto/create-tour-step.dto";
import { validate } from "class-validator";

@Injectable()
export class TourStepsService {

  constructor(
    @InjectRepository(TourStep)
    private tableTourStepsRepository: Repository<TourStep>, private connection : Connection
  ) {}

  findAll(): Promise<TourStep[]> {
    return this.tableTourStepsRepository.find();
  }

  findOne(id: number): Promise<TourStep | null> {
    return this.tableTourStepsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.tableTourStepsRepository.delete(id);
  }

  async  create(createTourStepDto: CreateTourStepDto): Promise<TourStep> {
        const tourStep            = new TourStep();
        tourStep.step             = createTourStepDto.step;
        tourStep.created_at       = createTourStepDto.created_at;

        const errors = await validate(tourStep)
        if (errors.length > 0) {
           throw new Error(`Validation failed! createTourStepDto creation`);
        } else {
           return this.tableTourStepsRepository.save(tourStep);
        }

        // return this.tableTourStepsRepository.save(tourStep);
  }

  async createMany(tableTourSteps: TourStep[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(tableTourSteps[0]);
      await queryRunner.manager.save(tableTourSteps[1]);

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