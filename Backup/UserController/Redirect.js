let ProInfo = {};

let LogMsg = {SignedIn:false,SignedUp:false};

const Redirect = (req,res)=>{
    const email = req.flash("emailSuccess");
    res.render("QRoom_Home/Temp/Redirect.ejs",{email,LogMsg});
}