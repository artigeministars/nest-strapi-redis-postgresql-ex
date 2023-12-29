import {
    IsInt,
    IsString,
    Min,
    Max,
    IsDate,
    IsOptional,
    IsEnum
} from "class-validator";

export enum playerStatus {
    active,
    passive,
    wait
}

export class CreateTablePlayerDto {

    @IsInt()
    table_id: number;
    @IsInt()
    player_id: number;
    @IsEnum(playerStatus)
    player_status: playerStatus;
    @IsInt()
    @Min(1)
    @Max(4)
    player_order: number;
    @IsDate()
    created_at: Date;
    @IsOptional()
    @IsDate()
    published_at: Date;
    @IsInt()
    @Min(1)
    created_by_id: number;

}