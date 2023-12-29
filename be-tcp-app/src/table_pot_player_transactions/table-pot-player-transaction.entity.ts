import { Entity, Column , PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TablePotPlayerTransaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    table_id: number;

    @Column()
    wallet_transaction_id: number;

    @Column()
    pot_before: number;

    @Column()
    pot_final: number;

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