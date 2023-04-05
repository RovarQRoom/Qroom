import multer from 'multer';

// Define the storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // set the filename for the uploaded file
  },
});

// Create a multer instance with the storage configuration
const upload = multer({ storage });

// Create a middleware function that handles the file upload
export const uploadProfilePicture = upload.single('profilePicture');