const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileImageSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    imageBase64: {
        type: String,
        required: true
    },
    UploadDate: Date
});

const ProfileImage = mongoose.model("ProfileImage", ProfileImageSchema);


module.exports = {
    ProfileImage
};