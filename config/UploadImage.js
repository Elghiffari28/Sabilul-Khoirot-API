import multer from "multer";
import fs from "fs";

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/"); // Folder tujuan penyimpanan
  },
  filename: function (req, file, cb) {
    // Normalisasi nama file
    const uniqueName = file.originalname.replace(/\s+/g, "_").toLowerCase(); // Ganti spasi dengan "_"
    cb(null, Date.now() + "_" + uniqueName);
  },
});

export const upload = multer({ storage });

export const DeleteImage = (filenames) => {
  if (!Array.isArray(filenames)) {
    filenames = [filenames];
  }
  filenames.forEach((filename) => {
    if (fs.existsSync(`public/images/${filename}`)) {
      fs.unlink(`public/images/${filename}`, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted:", `public/images/${filename}`);
        }
      });
    } else {
      console.log("File not found:", `public/images/${filename}`);
    }
  });
  // if (fs.existsSync(`uploads/${filename}`)) {
  //   fs.unlink(`uploads/${filename}`, (err) => {
  //     if (err) {
  //       console.error("Error deleting old file:", err);
  //       return res.status(500).json({ error: "Failed to delete old file" });
  //     }
  //     console.log("Old file deleted:", `uploads/${filename}`);
  //   });
  // }
};
