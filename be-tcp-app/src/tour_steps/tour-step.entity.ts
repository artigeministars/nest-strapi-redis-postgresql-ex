import { Entity, Column , PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TourStep {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    step: string;

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