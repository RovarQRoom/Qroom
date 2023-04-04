import mongoose, { Schema, Document, Model} from "mongoose";

export interface IHotels extends Document{
    _id:string;
    City:string;
    Address:string;
    Price:number;
    Name:string;
    Stars:number;
    Map:string;
}

const HotelsSchema = new Schema({
    _id:{type:String},
    City:{type:String},
    Address:{type:String},
    Price:{type:Number},
    Name:{type:String},
    Stars:{type:Number},
    Map:{type:String}
})

export const Hotels = mongoose.model<IHotels>("Hotels",HotelsSchema);