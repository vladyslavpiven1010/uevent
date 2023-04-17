export interface CreateUserEventDto {
    user_id: number;
    event_id: number;
    is_receiving_post: boolean;
    is_receiving_comment: boolean;
}