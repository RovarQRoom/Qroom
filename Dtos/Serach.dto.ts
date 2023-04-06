export class SearchDto {
    city:string;
    checkInDate: Date;
    checkOutDate: Date;
    adults: number;
    rooms:number;

    constructor(query: any) {
        this.city = query.city;
        this.checkInDate = query.checkInDate;
        this.checkOutDate = query.checkOutDate;
        this.adults = +query.adults; // convert to number
        this.rooms = +query.rooms; // convert to number
      }
}