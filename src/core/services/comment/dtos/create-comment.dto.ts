export interface CreateCommentDto {
    userId: number;
    eventId: number;
    replyToId: number;
    content: string;
}