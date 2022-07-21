const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) { 
    const fileName = file?.originalname;
    const fileExtension = fileName.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const str = uniqueSuffix + "." + fileExtension;
    cb(null, str);
  },
});

const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  console.log("in file upload get route");
  res.sendFile(__dirname + "/index.html");
});

// for single file
// router.post(
//   "/",
//   upload.single("file-1"),
//   (req, res) => {
//     res.send(req.file);
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );

// for multiple fields
router.post(
  "/",
  upload.fields([
    { name: 'file-1', maxCount: 1 },
    { name: 'file-2', maxCount: 1 }
  ]),
  (req, res) => {
    res.send(req.files);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
