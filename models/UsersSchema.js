const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const {isEmail} = require("validator");

const UserSignUpSchema = new Schema({
    name:{
        type:String,
        required:[true,'Please Enter A Name']
    },
    email:{
        type:String,
        required:[true,'Please Enter An Email'],
        unique:true,
        lowercase:true,
        validate: [isEmail,'Please Enter A Valid Email']
    },
    password:{
        type:String,
        required:[true,"Please Enter A Password"],
        minlength:[8,"Minimum Password Length is 8 Characters"]
    },
    phoneNumber:{
        type:String,
        required:[true,'Please Enter A Phone Number']
    },
    balance:{
        type:Number
    },
    dateOfBirth:{
        type:Date,
        required:[true,'Please Enter A Valid Birthday']
    },
    createdEvent:[
        {
        type:Schema.Types.ObjectId,
        ref:'Event'
        }
    ]
},{timestamps:true});

//Fire a Function Before Doc is Saved
UserSignUpSchema.pre('save',async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

UserSignUpSchema.statics.Login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }throw Error("Incorrect Password");

    }throw Error("Incorrect Email");

}

const UserSignInSchema = new Schema({
    email:String,
    date:Date,
});

const UserSignUp = mongoose.model("UsersSignedUp",UserSignUpSchema);
const UserSignIn = mongoose.model("SignIn",UserSignInSchema);


module.exports = {
    UserSignUp,
    UserSignIn
};