import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export enum playerStatus {
    active,
    passive,
    wait
}

@Entity()
export class TablePlayer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    table_id: number;

    @Column()
    player_id: number;

    @Column({ type: "enum", enum: playerStatus, default: playerStatus.passive })
    player_status: playerStatus;

    @Column()
    player_order: number; // 1,2,3,4 olacak başka birşey almayacak

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    published_at: Date;

    @Column()
    created_by_id: number;

    @Column()
    updated_by_id: number;


}