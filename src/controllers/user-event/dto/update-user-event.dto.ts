import { UpdateUserEventDto } from 'src/core/services/user-event/dtos';
import { IsOptional, IsInt, IsBoolean } from 'class-validator';

export class UpdateUserEventReqApiDto implements UpdateUserEventDto {
  @IsOptional()
  @IsInt()
  user_id: number;

  @IsInt()
  event_id: number;

  @IsBoolean()
  is_receiving_post: boolean;

  @IsBoolean()
  is_receiving_comment: boolean;
}