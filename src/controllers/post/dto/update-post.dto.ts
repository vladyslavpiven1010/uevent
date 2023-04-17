import { UpdatePostDto } from 'src/core/services/post/dtos';
import { IsISO8601, IsInt, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdatePostReqApiDto implements UpdatePostDto {
  @IsOptional()
  @IsInt()
  event_id: number;

  @IsOptional()
  @MinLength(1)
  @MaxLength(256)
  image_url?: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(256)
  title: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(4096)
  content: string;

  @IsOptional()
  @IsISO8601()
  created_at: Date;

  @IsOptional()
  @IsISO8601()
  updated_at: Date;

  @IsOptional()
  @IsISO8601()
  deleted_at: Date;
}