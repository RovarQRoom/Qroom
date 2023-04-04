import mongoose, { Schema, Document, Model} from "mongoose";

export interface IEvent extends Document{
    title: string;
    roomType: string;
    description: string;
    price: number;
    checkInDate: Date;
    checkOutDate: Date;
    creator: Schema.Types.ObjectId;
}

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    creator: [{
        type: Schema.Types.ObjectId,
        ref: 'UsersSignedUp'
    }]
});

export const Event = mongoose.model<IEvent>("Event", eventSchema);