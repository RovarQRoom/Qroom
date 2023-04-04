let Logger = {SignIn:false,SignOut:true};

const Logout = (req,res)=>{
    Logger.SignIn=false;
    Logger.SignOut=true;

    res.render("QRoom_Home/Temp/Logout.ejs");
    console.log("Logging Out");
}