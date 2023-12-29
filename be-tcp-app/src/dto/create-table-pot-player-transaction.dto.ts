import {
    IsInt,
    IsString,
    Min,
    IsDate,
    IsOptional
} from "class-validator";


export class CreateTablePotPlayerTransactionDto {

    @IsInt()
    table_id: number;
    @IsInt()
    wallet_transaction_id: number;
    @IsInt()
    pot_before: number;
    @IsInt()
    pot_final: number;
    @IsDate()
    created_at: Date;
    @IsOptional()
    @IsDate()
    published_at: Date;
    @IsInt()
    @Min(1)
    created_by_id: number;

}