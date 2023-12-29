import {
    IsInt,
    IsString,
    Min,
    IsDate,
    IsOptional
} from "class-validator";

export class CreateTablePlayerWalletTransactionDto {

    @IsInt()
    table_id: number;
    @IsInt()
    player_id: number;
    @IsInt()
    amount: number;
    @IsInt()
    table_tour_id: number;
    @IsInt()
    transaction_id: number;
    @IsDate()
    created_at: Date;
    @IsOptional()
    @IsDate()
    published_at: Date;
    @IsInt()
    @Min(1)
    created_by_id: number;

}