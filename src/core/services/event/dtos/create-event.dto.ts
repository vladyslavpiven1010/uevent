export interface CreateEventDto {
    companyId: number;
    categoryId: number;
    name: string;
    description?: string;
    format?: number;
    imageUrl?: string;
    wrapperUrl?: string;
    ticketCount: number;
    ticketPrice: number;
}