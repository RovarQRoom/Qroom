import mongoose, { Schema, Document, Model} from "mongoose";

export interface IRooms extends Document{
    _id:string;
    Price:number;
    Availability:boolean;
    Admin_ID:string;
    Room_Number:number;
    Room_Service:string;
    Type_of_Room:string;
}

const Rooms= new Schema({
    _id:{
        type:String
    },
    Price:{
        type:Number
    },
    Availability:{
        type:Boolean
    },
    Admin_ID:{
        type:String
    },
    Room_Number:{
        type:Number
    },
    Room_Service:{
        type:String,
        required:[true,"Please Enter a Room Service"]
    },
    Type_of_Room:{
        type:String,
        required:[true,"Please Enter a Type for The Room"]
    }
    
});

export const RamadaRoomModels = mongoose.model<IRooms>("ramada_rooms",Rooms);
export const HighcrestRoomModels = mongoose.model<IRooms>("highcrest_rooms",Rooms);
