const express = require("express");
const vision = require("@google-cloud/vision");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./demo/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  )
    cb(null, true);
  else cb(null, false);
};

const upload = multer({ storage });

router.post("/", upload.single("Image"), async (req, res) => {
  const file = req.file;
  try {
    const client = new vision.ImageAnnotatorClient({
      keyFilename: "./APIKey.json",
    });
    const [result] = await client.textDetection(file.path);
    const annonations = result.textAnnotations;
    res.status(200).json({ code: annonations[0].description });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error!" });
  }
});

module.exports = router;
