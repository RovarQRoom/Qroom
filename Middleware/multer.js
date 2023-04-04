const multer = require("multer");

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"Uploads")
    },
    filename:(req,file,cb)=>{
        //The Extension of The File Name
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        cb(null,file.fieldname+'-'+Date.now()+ext);
    }
})

module.exports = store = multer({storage});