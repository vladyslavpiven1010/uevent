import { CreateCommentDto } from 'src/core/services/comment/dtos';
import { MaxLength, IsInt, IsOptional, IsISO8601 } from 'class-validator';

export class CreateCommentReqApiDto implements CreateCommentDto {
  @IsInt()
  user_id: number;

  @IsInt()
  event_id: number;

  @IsInt()
  reply_to_id?: number;

  @IsOptional()
  @MaxLength(4096)
  content: string;
}