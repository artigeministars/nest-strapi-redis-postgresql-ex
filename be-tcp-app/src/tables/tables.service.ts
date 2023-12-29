import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Tables } from './table.entity';
import { CreateTableDto } from "../dto/create-table.dto";
import { UpdateTableDto } from "../dto/update-table.dto";
import { validate } from "class-validator";

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Tables)
    private tablesRepository: Repository<Tables>, private connection : Connection
  ) {}

  findAll(): Promise<Tables[]> {
    return this.tablesRepository.find();
  }

  findOne(id: number): Promise<Tables | null> {
    return this.tablesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.tablesRepository.delete(id);
  }

  async update(id: number, updateTableDto: UpdateTableDto): Promise<any> {
  let tableData: any = this.tablesRepository.findOneBy({ id });
  tableData!.config        = updateTableDto.config;
  tableData!.status        = updateTableDto.status;
  tableData!.parent_id     = updateTableDto.parent_id;
  tableData!.created_at    = updateTableDto.created_at;
  tableData!.created_by_id = updateTableDto.created_by_id;
  const errors = await validate(tableData!)
          if (errors.length > 0) {
             throw new Error(`Validation failed! createTableDto creation `);
          } else {
             return this.tablesRepository.update({  id: Number(id) },{ ...updateTableDto });
          }
  }

  async  create(createTableDto: CreateTableDto): Promise<Tables> {
        const table         = new Tables();
        table.config        = createTableDto.config;
        table.status        = createTableDto.status;
        table.parent_id     = createTableDto.parent_id;
        table.created_at    = createTableDto.created_at;
        table.created_by_id = createTableDto.created_by_id;

        const errors = await validate(table)
        if (errors.length > 0) {
           throw new Error(`Validation failed! createTableDto creation `);
        } else {
           return this.tablesRepository.save(table);
        }
        // return this.tablesRepository.save(table);
  }

  async createMany(tables: Tables[]) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(tables[0]);
      await queryRunner.manager.save(tables[1]);

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