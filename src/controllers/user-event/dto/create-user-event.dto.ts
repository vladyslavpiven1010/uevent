import { CreateUserEventDto } from 'src/core/services/user-event/dtos';
import { IsBoolean, IsInt } from 'class-validator';

export class CreateUserEventReqApiDto implements CreateUserEventDto {
  @IsInt()
  user_id: number;

  @IsInt()
  event_id: number;

  @IsBoolean()
  is_receiving_post: boolean;

  @IsBoolean()
  is_receiving_comment: boolean;
}