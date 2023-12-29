import {
    IsInt,
    IsString,
    Min,
    IsDate,
    IsOptional
} from "class-validator";

export class CreateTourStepDto {

    @IsString()
    step: string;
    @IsDate()
    created_at: Date;
    @IsOptional()
    @IsDate()
    published_at: Date;
    @IsInt()
    @Min(1)
    created_by_id: number;

}