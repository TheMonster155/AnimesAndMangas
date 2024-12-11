const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configurazione di Cloudinary con le credenziali prese dalle variabili d'ambiente
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurazione dello storage per multer utilizzando Cloudinary
const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determina il tipo di file (immagine o video)
    const isImage = file.mimetype.startsWith("image/");
    const isVideo = file.mimetype.startsWith("video/");

    // Controllo del tipo di file supportato
    if (!isImage && !isVideo) {
      // Modificato l'avviso di errore
      throw new Error("Unsupported file type");
    }

    // Restituisce le configurazioni necessarie per l'upload
    return {
      folder: "Mangas", // Cartella di destinazione su Cloudinary
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
      ], // Formati supportati
      resource_type: isVideo ? "video" : "image", // Tipo di risorsa (immagine o video)
      public_id: file.originalname.split(".")[0], // Nome pubblico del file (senza estensione)
    };
  },
});

// Middleware di multer configurato per utilizzare CloudinaryStorage
const cloud = multer({ storage: cloudStorage });

module.exports = cloud;
