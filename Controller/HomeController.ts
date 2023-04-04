const ProfileModels = require("../models/ProfileImageSchema");

//User Data
let user = {};


const Webpage = async(req, res) => {
    user = Object.assign({}, res.locals.user);
    let Image;
    if (res.locals.user) {
        Image = await ProfileModels.ProfileImage.findOne({ email: user._doc.email }).sort({ $natural: -1 }).limit(1);
    }
    let today = new Date();
    today = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    res.render("QRoom_Home/Main.ejs", { Image: Image, Today: today });
}

const Contact = async(req, res) => {
    user = Object.assign({}, res.locals.user);
    let Image;
    if (res.locals.user) {
        Image = await ProfileModels.ProfileImage.findOne({ email: user._doc.email }).sort({ $natural: -1 }).limit(1);
    }

    res.render("QRoom_Home/Contact.ejs", { Image: Image });
}

const Reviews = async(req, res) => {
    user = Object.assign({}, res.locals.user);
    let Image;
    if (res.locals.user) {
        Image = await ProfileModels.ProfileImage.findOne({ email: user._doc.email }).sort({ $natural: -1 }).limit(1);
    }

    res.render("QRoom_Home/Reviews.ejs", { Image: Image });
}

const About = async(req, res) => {
    user = Object.assign({}, res.locals.user);
    let Image;
    if (res.locals.user) {
        Image = await ProfileModels.ProfileImage.findOne({ email: user._doc.email }).sort({ $natural: -1 }).limit(1);
    }

    res.render("QRoom_Home/About.ejs", { Image: Image });
}

const Map = async(req, res) => {
    res.render("QRoom_Home/mapBox.ejs");
}

module.exports = {
    Webpage,
    Reviews,
    About,
    Contact,
    Map
}