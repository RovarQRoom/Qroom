const HotelModels = require("../models/HotelsSchema");
const flash = require("connect-flash");
const mongoose      = require("mongoose");

const ProfileModels = require("../models/ProfileImageSchema");

const db = mongoose.connection;
let user = {};
const Search = async (req,res)=>{
    let count = 0;
    let search;
    user = Object.assign({},res.locals.user);
    let Image;
    if(res.locals.user){
        Image = await ProfileModels.ProfileImage.findOne({email:user._doc.email}).sort({$natural:-1}).limit(1);
    }
    HotelModels.Hotels.find().then((data)=>{
        data.forEach(d => {
            if(d){
                count++;
            }
        });
        res.render("QRoom_Home/Searchbar/Search.ejs",{Find:data,count,Image,search});
    });
    console.log(new Date())
};

const SearchResult = async (req,res)=>{
    let search = req.body.term;
    let count = 0;
    user = Object.assign({},res.locals.user);
    let Image;
    if(res.locals.user){
        Image = await ProfileModels.ProfileImage.findOne({email:user._doc.email}).sort({$natural:-1}).limit(1);
    }

    let find = await HotelModels.Hotels.find({Name:{$regex:new RegExp(".*"+search+".*",'i')}}).limit(7).exec();
    find.forEach(element=>{
        count++;
    });
    user = user._doc;
    res.render("QRoom_Home/Searchbar/Search.ejs",{Find:find,count,Image,user,search:undefined});
}

const SearchResultMain = async (req,res)=>{

    user = Object.assign({},res.locals.user);
    let Image;
    if(res.locals.user){
        Image = await ProfileModels.ProfileImage.findOne({email:user._doc.email}).sort({$natural:-1}).limit(1);
    }

    let search = {
        Location:       req.body.cityVal,
        Check_In_Date:  req.body.checkInDate,
        Check_Out_Date: req.body.checkOutDate,
        Adults:         req.body.adultNum,
        Children:       req.body.childNum,
        Rooms:          req.body.roomNum
    };
    
    let count = 0;
    let find = await HotelModels.Hotels.find({City:search.Location}).limit(7).exec();
    find.forEach(element=>{
        count++;
    })
    res.render("QRoom_Home/Searchbar/Search.ejs",{Find:find,count,Image,search})
}


module.exports = {
    Search,
    SearchResult,
    SearchResultMain
};