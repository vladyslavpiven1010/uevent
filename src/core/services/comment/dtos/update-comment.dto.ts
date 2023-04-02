export interface UpdateCommentDto {
  userId?: number;
  eventId?: number;
  replyToId?: number;
  content?: string;
}