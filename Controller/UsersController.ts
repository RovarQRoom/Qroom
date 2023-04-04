//Mongodb User Model
const UserModels = require("../models/UsersSchema");
//Cookie Handlers
const jwt = require('jsonwebtoken');

const handleErrors = (err)=>{
    console.log(err.message,err.code);
    let errors = {name:'',email:'',password:'',phoneNumber:'',dateOfBirth:''};

    //Duplicate Error Code
    if(err.code === 11000){
        errors.email = 'That Email is Already Registered';
        return errors;
    }

    //Invalid Email
    if(err.message === "Incorrect Email"){
        errors.email= "That Email is Not Registered";
    }

    //Invalid Password
    if(err.message === "Incorrect Password"){
        errors.password= "Invalid Password";
    }

    //Validation Errors
    if(err.message.includes('UsersSignedUp validation failed')){  
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

const maxAge = 3*24*60*60;
const createToken = (id)=>{
    return jwt.sign({id},'rovar hanaw avan yassin',{
        expiresIn:maxAge
    })
}

module.exports.Signup_Get = (req,res)=>{
    res.render("QRoom_Home/Signup.ejs");
}

module.exports.Login_Get = (req,res)=>{
    res.render("QRoom_Home/Login.ejs");
}

module.exports.Logout_Get = (req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.render("QRoom_Home/Temp/Logout.ejs");
}

module.exports.Signup_Post = async (req,res)=>{

    const {email,name,password,phoneNumber,dateofBirth} = req.body;

    try{
            const user = await UserModels.UserSignUp.create({
                name:name,
                email:email,
                password:password,
                phoneNumber:phoneNumber,
                balance:0,
                dateOfBirth:dateofBirth
            });
            const token = createToken(user._id);
            res.cookie('jwt',token,{
                httpOnly:true,
                maxAge:maxAge*1000
            })
            res.status(201).json({user: user._id});
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.Login_Post = async (req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await UserModels.UserSignUp.Login(email,password);
        await UserModels.UserSignIn.create({
            email:user.email,
            date:Date.now()
        });
        const token = createToken(user._id);
            res.cookie('jwt',token,{
                httpOnly:true,
                maxAge:maxAge*1000
            })
        res.status(200).json({user:user._id});
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}
