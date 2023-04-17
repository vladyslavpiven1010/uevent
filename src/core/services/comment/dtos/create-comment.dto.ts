export interface CreateCommentDto {
    user_id: number;
    event_id: number;
    reply_to_id?: number;
    content: string;
}