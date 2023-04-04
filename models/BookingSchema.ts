import mongoose, { Schema, Document, Model} from "mongoose";

export interface IBooking extends Document{
    event:Schema.Types.ObjectId;
    user:Schema.Types.ObjectId;
}

const bookingSchema = new Schema({
    event:{
        type:Schema.Types.ObjectId,
        ref:"Event"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"UsersSignedUp"
    }
},{timestamps:true});

export const Booking = mongoose.model<IBooking>("Booking",bookingSchema);