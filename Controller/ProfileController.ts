const ProfileModels = require("../models/ProfileImageSchema");
const UserModels = require("../models/UsersSchema");
const bcrypt = require("bcrypt");


const fs = require("fs");

let errors = [];

//User Data
let user = {};
const Profile = async(req, res) => {
    user = Object.assign({}, res.locals.user);
    let Image = await ProfileModels.ProfileImage.find({ email: user._doc.email }).sort({ $natural: -1 });
    res.render("QRoom_Home/profile.ejs", { Image: Image[0] });
}

const ProfileDataUpdate = async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const currentPass = req.body.currentPass;
    const confirmPass = req.body.confirmPass;
    const newPass = req.body.newPass;

    const id = req.params.id;


    if (name == "" || email == "" || phoneNumber == "" || currentPass == "") {
        errors.push({ text: "Empty Fields" });
        console.log("Error Empty Fields");
    }
    if (!/^[a-zA-Z ]*$/.test(name)) {
        errors.push({ text: "Invalid Name Fields" });
        console.log("Error Invalid Name Fields");
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        errors.push({ text: "Invalid Email Entered" });
        console.log("Error Invalid Email Entered");
    }
    if (currentPass == newPass) {
        errors.push({ text: "You Can't Use The Same Password" });
        console.log("Error You Can't Use The Same Password");
    }

    //Updating Data
    try {
        const auth = await bcrypt.compare(currentPass, user._doc.password);
        console.log("Comparing Passwords");
        if (auth) {
            console.log("Auth Verified");
            if (newPass == confirmPass) {
                console.log("Passwords Match");
                let salt = await bcrypt.genSalt();
                const hashedpassword = await bcrypt.hash(newPass, salt);
                await ProfileModels.ProfileImage.findOneAndUpdate({ email: user._doc.email }, { $set: { email: email } })
                    .then(data => {
                        if (data) {
                            console.log("Success, Both Email is Changed");
                        } else {
                            console.log("Success");
                        }
                    }).catch(err => {
                        console.log(err);
                        res.status(400);
                        res.redirect("/Profile");
                    })
                await UserModels.UserSignUp.findOneAndUpdate({ _id: id }, {
                    $set: {
                        name: name,
                        email: email,
                        password: hashedpassword,
                        phoneNumber: phoneNumber
                    }
                }).then(data => {
                    console.log("Info Successfully Changed");
                    res.redirect("/Profile");
                }).catch(err => {
                    console.log(err);
                    res.redirect("/Profile")
                })
            } else {
                errors.push({ text: "The Password Doesn't Match The Confirmed One" });
                console.log("The Password Doesn't Match The Confirmed One");
                res.redirect("/Profile")
                res.status(400);
            }

        } else {
            errors.push({ text: "The Password Doesn't Match" });
            console.log("The Password Doesn't Match");
            res.redirect("/Profile");
        }
    } catch (err) {
        console.log(err);
        res.redirect("/Profile");
    }
}

const PictureWebpage = async(req, res) => {
    user = Object.assign({}, res.locals.user);
    let Image = await ProfileModels.ProfileImage.find({ email: user._doc.email }).sort({ $natural: -1 });
    res.render("QRoom_Home/picture_Update.ejs", { Image: Image[0] });
}

const ProfilePictureUpdate = async(req, res, next) => {
    console.log(user._doc.email);
    const files = req.files;
    //Finding Files
    if (!files) {
        const error = new Error("Please Choose File");
        error.httpStatusCode = 400;
        return next(error);
    }
    let imgArray = files.map((file) => {
        let img = fs.readFileSync(file.path);
        return encode_img = img.toString('base64');
    })

    let result = imgArray.map(async(src, index) => {
            let finallimg = {
                email: user._doc.email,
                filename: files[index].originalname,
                contentType: files[index].mimetype,
                imageBase64: src,
                UploadDate: Date.now()
            }

            let newUploaded = await ProfileModels.ProfileImage(finallimg);
            return newUploaded.save().then(() => {
                return { msg: "Image Uploaded Successfully" }
            }).catch(err => {
                console.log(err);
            });
        })
        //create object to store data in collection
    Promise.all(result).then(msg => {
        console.log("You Have Succesfuly Changed The Profile Picture");
        res.redirect("/Profile/" + user._doc._id);
    })
}

module.exports = {
    Profile,
    ProfilePictureUpdate,
    PictureWebpage,
    ProfileDataUpdate
}