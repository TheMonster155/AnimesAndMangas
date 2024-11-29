const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Aggiungi log per il caricamento delle credenziali
console.log(
  "Cloudinary configurato con cloud_name:",
  process.env.CLOUDINARY_CLOUD_NAME
);

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    console.log("File ricevuto per l'upload:", file); // Logga il file ricevuto

    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");

    if (!isImage && !isVideo) {
      console.log("Errore: file non supportato."); // Logga l'errore nel caso in cui il file non sia supportato
      throw new Error("File non supportato");
    }

    return {
      folder: "Mangas",
      allowed_formats: [
        "jpg",
        "png",
        "jpeg",
        "gif",
        "mp4",
        "mov",
        "avi",
        "hevc",
        "3gp",
      ],
      resource_type: isVideo ? "video" : "image",
      public_id: file.originalname.split(".")[0],
    };
  },
});

// Logga quando Multer è configurato correttamente
console.log("Multer storage configurato correttamente");

const cloud = multer({ storage: cloudStorage });

// Esporta il middleware
module.exports = cloud;

/*

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
/*
const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");

    if (!isImage && !isVideo) {
      throw new Error("File not supported");
    }

    return {
      folder: "SICILIAN-TASTE-SERVER-UPLOADS",
      allowed_formats: [
        "jpg",
        "png",
        "jpeg",
        "gif",
        "mp4",
        "mov",
        "avi",
        "hevc",
      ],
      resource_type: isVideo ? "video" : "image",
      public_id: file.originalname.split(".")[0],
    };
  },
});*/
/*
const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");

    if (!isImage && !isVideo) {
      throw new Error("File non supportato");
    }

    return {
      folder: "SICILIAN-TASTE-SERVER-UPLOADS",
      allowed_formats: [
        "jpg",
        "png",
        "jpeg",
        "gif",
        "mp4",
        "mov",
        "avi",
        "hevc",
      ],
      resource_type: isVideo ? "video" : "image",
      public_id: file.originalname.split(".")[0],
    };
  },
});

const cloud = multer({ storage: cloudStorage });

module.exports = cloud;
*/
