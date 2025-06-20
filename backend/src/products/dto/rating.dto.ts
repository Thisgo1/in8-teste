import { IsIn, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateRatingDto {
  @IsNumber()
  @Min(0.5)
  @Max(5)
  @IsIn([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5])
  rating: number;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  comment?: string;
}
