import {
  IsInt,
  IsDate,
  Min,
  IsOptional,
  IsDateString
} from 'class-validator';

export class UpdateTableDto {

    @IsInt()
    config: number;
    @IsInt()
    status: number;
    @IsInt()
    parent_id: number;
    @IsDateString()
    created_at: Date;
    @IsOptional()
    @IsDate()
    published_at: Date;
    @IsInt()
    @Min(1)
    created_by_id: number;
    @IsInt()
    @Min(1)
    @IsOptional()
    updated_by_id: number;

}