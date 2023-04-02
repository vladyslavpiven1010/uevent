export interface UpdateUserEventDto {
  userId?: number;
  eventId?: number;
  isReceivingPost?: boolean;
  isReceivingComment?: boolean;
}