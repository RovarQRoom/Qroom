export interface SearchDto {
    search: string;
}

export interface SearchMainDto {
    city:string;
    checkInDate: Date;
    checkOutDate: Date;
    adults: number;
    rooms:number;
}