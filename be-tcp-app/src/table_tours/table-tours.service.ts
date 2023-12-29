import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , Connection } from 'typeorm';
import { TableTour } from './table-tour.entity';
import { CreateTableTourDto } from "../dto/create-table-tour.dto";
import { validate } from "class-validator";

@Injectable()
export class TableToursService {
  constructor(
    @InjectRepository(TableTour)
    private tableToursRepository: Repository<TableTour>, private connection : Connection
  ) {}

  findAll(): Promise<TableTour[]> {
    return this.tableToursRepository.find();
  }

  findOne(id: number): Promise<TableTour | null> {
    return this.tableToursRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.tableToursRepository.delete(id);
  }

  async  create(createTableTourDto: CreateTableTourDto): Promise<TableTour> {
        const tableTour                 = new TableTour();
        tableTour.table_id              = createTableTourDto.table_id;
        tableTour.player_id             = createTableTourDto.player_id;
        tableTour.move_type             = createTableTourDto.move_type;
        tableTour.move_amount           = createTableTourDto.move_amount;
        tableTour.transaction_wallet_id = createTableTourDto.transaction_wallet_id;
        tableTour.tour_step_id          = createTableTourDto.tour_step_id;
        tableTour.created_at            = createTableTourDto.created_at;

        const errors = await validate(tableTour)
        if (errors.length > 0) {
            throw new Error(`Validation failed! createTableTourDto creation`);
        } else {
            return this.tableToursRepository.save(tableTour);
        }

        // return this.tableToursRepository.save(tableTour);
  }

  async createMany(tableTours: TableTour[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(tableTours[0]);
      await queryRunner.manager.save(tableTours[1]);

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