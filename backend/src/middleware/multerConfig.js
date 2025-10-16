import multer from "multer";
import path from "path";

/**
 * Configure storage settings for uploaded files using multer.
 * 
 * - `destination`: Specifies the folder where uploaded files will be saved.
 * - `filename`: Generates a unique filename to avoid overwriting existing files.
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save all uploads to the 'uploads/' folder
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Generate a unique suffix using current timestamp and a random number
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    // Filename format: fieldname-uniqueSuffix.extension
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

/**
 * File filter to allow only XML files.
 * 
 * - Checks the file extension using path.extname.
 * - Accepts only `.xml` files, rejects others with an error.
 */
const fileFilter = (req, file, cb) => {
  if (path.extname(file.originalname).toLowerCase() === ".xml") {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only XML files are allowed"), false); // Reject the file
  }
};

/**
 * Export a configured multer instance:
 * 
 * - `storage`: Uses the above storage settings.
 * - `fileFilter`: Uses the XML-only filter.
 * - `limits`: Restricts file size to 10 MB.
 */
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  }
});
