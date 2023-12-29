import {
    IsInt,
    IsString,
    Min,
    IsDate,
    IsEnum,
    IsOptional
} from "class-validator";

export enum moveType {
         fold,
         call,
         raise
}

export class CreateTableTourDto {

    @IsInt()
    table_id: number;
    @IsInt()
    player_id: number;
    @IsEnum(moveType)
    move_type: moveType;
    @IsInt()
    move_amount: number;
    @IsInt()
    transaction_wallet_id: number;
    @IsInt()
    tour_step_id: number;
    @IsDate()
    created_at: Date;
    @IsOptional()
    @IsDate()
    published_at: Date;
    @IsInt()
    @Min(1)
    created_by_id: number;

}