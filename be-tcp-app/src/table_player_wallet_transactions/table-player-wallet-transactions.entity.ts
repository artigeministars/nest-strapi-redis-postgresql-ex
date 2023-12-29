import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

export class TablePlayerWalletTransaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    table_id: number;

    @Column()
    player_id: number;

    @Column()
    amount: number;

    @Column()
    table_tour_id: number;

    @Column()
    transaction_id: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;
    // @Column({ type: 'datetime' })
    // created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    published_at: Date;

    @Column()
    created_by_id: number;

    @Column()
    updated_by_id: number;
    /*
    @ManyToOne(() => Table, (table) => table.photos)
    table: Table;
    */
}