const SignupPage = (req,res)=>{
    let errors = [];
    const name = req.body.NameReg;
    const email = req.body.EmailReg;
    const phoneNumber = req.body.PhonenumberReg;
    const dateOfBirth = req.body.DateofBirthReg;

    res.render("QRoom_Home/Signup.ejs",{title:"Signup",errors,name,email,phoneNumber,dateOfBirth});
}

const Signup = (req,res,next)=>{

    const name = req.body.NameReg;
    const email = req.body.EmailReg;
    const password = req.body.PasswordReg;
    const conPassword = req.body.ConfirmReg;
    const phoneNumber = req.body.PhonenumberReg;
    const dateOfBirth = req.body.DateofBirthReg;

    let errors = [];

    if(name=="" || email=="" || password=="" || conPassword=="" || phoneNumber=="" || dateOfBirth==""){
        errors.push({text:"Empty Fields"});
    }
    if(!/^[a-zA-Z ]*$/.test(name)){
        errors.push({text:"Invalid Name Fields"});
    }
    if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        errors.push({text:"Invalid Email Entered"});
    }
    if(!new Date(dateOfBirth).getTime()){
        errors.push({text:"Invalid Date of Birth Entered"});
    }
    if(password.length < 8){
        errors.push({text:"The Password is Too Short"});
    }
    if(password!=conPassword){
        errors.push({text:"The Password Does not Match"});
    }else{
        //Checking if User Already Exist
        UserModels.UserSignUp.find({email}).then((result)=>{
            if(result.length){

                errors.push({text:"Email Already Exist"});

                if(errors.length>0){
                    res.render("QRoom_Home/Signup.ejs",{errors,name,email,phoneNumber,dateOfBirth});
                }
            }else{
                //Try to Create New User
                //Password Handler
                const saltRounds = 10;
                bcrypt.hash(password , saltRounds).then(hashedPassword=>{

                    const newUser = UserModels.UserSignUp({
                        name:name,
                        email:email,
                        password: hashedPassword,
                        phoneNumber:phoneNumber,
                        balance:0,
                        dateOfBirth:dateOfBirth
                    });

                    newUser.save().then((result)=>{
                        LogMsg.SignedIn = false;
                        LogMsg.SignedUp = true;

                        let update = {Name: name,Email:email,PhoneNumber:phoneNumber};
                        ProInfo = Object.assign(ProInfo,update);

                        req.flash("emailSuccess",email);

                        res.redirect("/Redirect");
                        console.log("You Have Successfully Signed Up");
                        
                        Logger.SignIn = true;
                        Logger.SignOut = false;

                    }).catch((err)=>{
                        errors.push({text:"An Error Occurred While Saving User Account"});

                    })
                }).catch((err)=>{
                    errors.push({text:"An Error Occurred While Hashing Password"});

                })
            }
        }).catch((err)=>{
            console.log(err);
            errors.push({text:"An Error Occurred While Checking For User Existing"});
        })
    }
    if(errors.length>0){
        res.render("QRoom_Home/Signup.ejs",{errors,name,email,phoneNumber,dateOfBirth});
    }
}