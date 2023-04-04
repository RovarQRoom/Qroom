const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const RamadaRoomModels = mongoose.model("ramada_rooms",Rooms);
const HighcrestRoomModels = mongoose.model("highcrest_rooms",Rooms);

module.exports = {
    RamadaRoomModels,
    HighcrestRoomModels
}