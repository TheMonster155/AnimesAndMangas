const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");

    if (!isImage && !isVideo) {
      throw new Error("Unsupported file type");
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
        "webp",
      ],
      resource_type: isVideo ? "video" : "image",
      public_id: file.originalname.split(".")[0],
    };
  },
});

const cloud = multer({ storage: cloudStorage });

module.exports = cloud;
