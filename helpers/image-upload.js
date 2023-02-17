const multer = require("multer");
const path = require("path");

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    console.log(req.baseUrl)

    if (req.baseUrl.includes('user')) {
      folder = "usuarios";
    } else if (req.baseUrl.includes('imoveis')) {
      folder = "imoveis";
    }
    cb(null, `public/images/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|pdf|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
