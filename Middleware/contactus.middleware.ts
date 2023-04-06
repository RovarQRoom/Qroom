import { Request, Response, NextFunction } from 'express';
import nodemailer, { Transporter } from 'nodemailer';

interface EmailOptions {
    from: string;
    subject: string;
    text: string;
}

// Create a transporter object for sending emails
const transporter: Transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'rovar.07000120@univsul.edu.iq', // Replace with your Gmail address
    pass: '900mylife' // Replace with your Gmail password
  }
});

// Define a middleware function that sends an email for every incoming request
export function sendEmailMiddleware(options: EmailOptions) {
    return function(req: Request, res: Response, next: NextFunction): void {
      const mailOptions = {
        from: options.from,
        to: `rovar.07000120@univsul.edu.iq`,
        subject: options.subject,
        text: options.text
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Failed to send email: ${error}`);
          throw error;
        } else {
          console.log(`Email sent: ${info.response}`);
          return res.redirect("/Contact");
        }
      });
  
      next(); // Call the next middleware function
    };
  }