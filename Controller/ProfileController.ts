import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { uploadProfilePicture } from '../Middleware';
import { ProfileRepository } from '../Repository';
import { ProfileService } from '../Service';

const profileRepository = new ProfileRepository();
const profileService = new ProfileService(profileRepository);

export const Profile = async(req:Request, res:Response) => {
    res.render("QRoom_Home/profile.ejs");
}

export const ProfileDataUpdate = async(req:Request, res:Response) => {
  
}

export const PictureWebpage = async(req:Request, res:Response) => {
    res.render("QRoom_Home/picture_Update.ejs");
}

export const ProfilePictureUpdate = async(req:Request, res:Response, next:NextFunction) => {
    // Get the user id from the request object
    const id = req.params.id;

    // Call the middleware function
     uploadProfilePicture(req, res, (err)=>{
        if(err){
            console.log(err);
            res.status(500).json({error: err});
        }else{

            // Get the file path from the request object
            const filePath = req.file?.path;

            // Call the service function
            profileService.updateUserPicture(id, filePath? filePath : "").then((result)=>{
                console.log('Profile picture updated successfully');
            }).catch((err)=>{
                console.log(err);
            })
            console.log("File Uploaded");
            
            res.status(200).redirect(`/Profile/${id}`);
            
        }
    })
}
