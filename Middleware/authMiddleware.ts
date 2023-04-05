import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserSignUp } from '../models';
import * as dotenv from 'dotenv'

dotenv.config();

const secretKey = process.env.JWT_SECRET || 'secretKey';

declare global {
    namespace Express {
      interface Request {
         userId?: string; isAuth?: boolean;
      }
    }
  }
  interface JWTPayload {
    userId: string;
  }
  
  export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['jwt'];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey) as JWTPayload;
      req.userId = decoded.userId;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
  
  export function setTokenCookie(res: Response, token: string) {
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: secretKey === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
  }

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    //Check if Token Exist And Verified
    if(token){
        jwt.verify(token,secretKey, async (err:any,decodedToken:any)=>{
            if(err){
                console.log(err);
                res.locals.user = null;
                req.isAuth = false;
                next();
            }else{
                console.log(decodedToken);
                let userFind = await UserSignUp.findById(decodedToken.userId);
                res.locals.user = userFind;
                res.locals.token = token;
                next();
                req.userId = userFind?._id; 
                req.isAuth = true;
                return userFind;
            }
        });
    }else{
        res.locals.user = null;
        req.isAuth = false;
        next();
    }
};
