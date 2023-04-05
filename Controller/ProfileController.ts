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
    const id = req.params.id;
     uploadProfilePicture(req, res, (err)=>{
        if(err){
            console.log(err);
            res.status(500).json({error: err});
        }else{
            console.log(req.file?.path);

            // Get the file path from the request object
            const filePath = req.file?.path;

            profileService.updateUserPicture(id, filePath? filePath : "").then((result)=>{
                console.log('Profile picture updated successfully');
                res.redirect(`/Profile/${id}`);
            }).catch((err)=>{
                console.log(err);
            })

            res.status(200).json({message: "File Uploaded"});
        }
    })
}
