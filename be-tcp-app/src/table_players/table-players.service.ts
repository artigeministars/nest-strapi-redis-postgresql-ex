import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { TablePlayer } from './table-player.entity';
import { CreateTablePlayerDto } from "../dto/create-table-player.dto";
import { validate } from "class-validator";

@Injectable()
export class TablePlayersService {
  constructor(
    @InjectRepository(TablePlayer)
    private tablePlayersRepository: Repository<TablePlayer>, private connection : Connection
  ) {}

  findAll(): Promise<TablePlayer[]> {
    return this.tablePlayersRepository.find();
  }

  findOne(id: number): Promise<TablePlayer | null> {
    return this.tablePlayersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.tablePlayersRepository.delete(id);
  }

  async  create(createTablePlayerDto: CreateTablePlayerDto): Promise<TablePlayer> {
        const tablePlayer         = new TablePlayer();
        tablePlayer.table_id      = createTablePlayerDto.table_id;
        tablePlayer.player_id     = createTablePlayerDto.player_id;
        tablePlayer.player_status = createTablePlayerDto.player_status;
        tablePlayer.player_order  = createTablePlayerDto.player_order;
        tablePlayer.created_at    = createTablePlayerDto.created_at;

        const errors = await validate(tablePlayer)
        if (errors.length > 0) {
            throw new Error(`Validation failed! createTablePlayerDto creation`);
        } else {
            return this.tablePlayersRepository.save(tablePlayer);
        }

        // return this.tablePlayersRepository.save(tablePlayer);
  }

  async createMany(tablePlayers: TablePlayer[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(tablePlayers[0]);
      await queryRunner.manager.save(tablePlayers[1]);

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