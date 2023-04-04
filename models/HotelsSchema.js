const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HotelsSchema = new Schema({
    _id:{type:String},
    City:{type:String},
    Address:{type:String},
    Price:{type:Number},
    Name:{type:String},
    Stars:{type:Number},
    Map:{type:String}
})

const Hotels = mongoose.model("Hotels",HotelsSchema);

module.exports = {
    Hotels
};