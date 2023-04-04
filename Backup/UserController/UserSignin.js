const LoginPage = (req,res)=>{
    const errors = {
        error1: req.flash("SignErr1"),
        error2: req.flash("SignErr2")
    };
    const errorTypes = {
        type1: req.flash("type1"),
        type2: req.flash("type2")
    };
    res.render("QRoom_Home/Login.ejs",{errors,errorTypes});
}

const Loggedin = (req,res) =>{
    const email = req.body.EmailSign;
    const password = req.body.PasswordSign;

    if(email==""||password==""){
        req.flash("SignErr1","Empty Email/Password Fields");
        req.flash("type1","ER1");
        res.redirect("/Login");
    }else{
        //Check if Email Exist
        UserModels.UserSignUp.find({email}).then((data)=>{
            if(data.length){
                //User Exists

                const hashedPassword = data[0].password;
                bcrypt.compare(password,hashedPassword).then((result)=>{
                    if(result){
                        //Password Match
                        const newUser = UserModels.UserSignIn({
                            email:email,
                            date: Date.now()
                        });

                        newUser.save().then((result)=>{
                            LogMsg.SignedIn = true;
                            LogMsg.SignedUp = false;

                            let update = {Name: data[0].name,Email:data[0].email,PhoneNumber:data[0].phoneNumber};
                            ProInfo = Object.assign(ProInfo,update);

                            console.log(ProInfo);

                            req.flash("emailSuccess",email);

                            res.redirect("/Redirect");
                            console.log("You Have Succesfuly Signed In");

                            Logger.SignIn = true;
                            Logger.SignOut = false;
                        })
                    }else{

                        req.flash("SignErr2","Invalid Email or Password");
                        req.flash("type2","ER2");
                        res.redirect("/Login");
                    }
                }).catch((err)=>{
                    res.json({
                        status: "FAILED",
                        message: "An Error Occurred While Comparing Passwords"
                    }) 
                })
            }else{
                req.flash("SignErr2","Invalid Email or Password");
                req.flash("type2","ER2");
                res.redirect("/Login");
            }
        }).catch((err)=>{
            res.json({
                status: "FAILED",
                message: "An Error Occurred While Checking For Existing User"
            }) 
        })
    }
}