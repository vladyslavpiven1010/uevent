export interface CreateUserEventDto {
    userId: number;
    eventId: number;
    isReceivingPost: boolean;
    isReceivingComment: boolean;
}