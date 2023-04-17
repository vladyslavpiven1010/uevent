import { CreatePostDto } from 'src/core/services/post/dtos';
import { IsISO8601, IsInt, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreatePostReqApiDto implements CreatePostDto {
  @IsInt()
  event_id: number;

  @IsOptional()
  @MinLength(1)
  @MaxLength(256)
  image_url?: string;

  @MinLength(1)
  @MaxLength(256)
  title: string;

  @MinLength(1)
  @MaxLength(4096)
  content: string;

  @IsISO8601()
  created_at: Date;

  @IsISO8601()
  updated_at: Date;

  @IsISO8601()
  deleted_at: Date;
}