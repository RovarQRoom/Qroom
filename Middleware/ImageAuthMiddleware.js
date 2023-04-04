const jwt = require('jsonwebtoken');
const UserModels = require("../models/UsersSchema");
const ImageModels = require("../models/ProfileImageSchema");

const checkImage =  (req,res,next)=>{
    const token = req.cookies.jwt;
    //Check if Token Exist And Verified
    if(token){
        jwt.verify(token,'rovar hanaw avan yassin', async (err,decodedToken)=>{
            if(err){
                console.log(err);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken);
                let user = await UserModels.UserSignUp.findById(decodedToken.id);
                let Image = await ImageModels.ProfileImage.find({email:user.email}).sort({$natural:-1});
                console.log(Image);
                res.locals.Image = Image;
                next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
}
module.exports = {checkImage};