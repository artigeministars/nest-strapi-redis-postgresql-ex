import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tables {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  config: number;

  @Column()
  status: number;

  @Column()
  parent_id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  published_at: Date;

  @Column()
  created_by_id: number;

  // @Column()
  // updated_by_id: number;

  /*
  @OneToMany(type => TabkePlayers, table_Player => table_Player.table_id)
  table_players: TablePlayer[];
  */

}