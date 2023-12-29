import { Entity, Column , PrimaryGeneratedColumn } from "typeorm";

export enum moveType {
         fold,
         call,
         raise
}

@Entity()
export class TableTour {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    table_id: number;

    @Column()
    player_id: number;

    @Column({ type: "enum", enum: moveType, default: moveType.fold })
    move_type: moveType;

    @Column()
    move_amount: number;

    @Column()
    transaction_wallet_id: number;

    @Column()
    tour_step_id: number;

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