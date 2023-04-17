import { UpdateCommentDto } from 'src/core/services/comment/dtos';
import { MaxLength, IsInt, IsOptional, IsISO8601 } from 'class-validator';

export class UpdateCommentReqApiDto implements UpdateCommentDto {
  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsInt()
  event_id?: number;

  @IsOptional()
  @IsInt()
  reply_to_id?: number;

  @IsOptional()
  @MaxLength(4096)
  content?: string;

  @IsOptional()
  @IsISO8601()
  created_at?: Date;

  @IsOptional()
  @IsISO8601()
  deleted_at?: Date;
}