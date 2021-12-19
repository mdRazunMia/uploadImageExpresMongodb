const express = require("express")
const router = express.Router();
// const multer = require("multer")
// const upload = multer()
const uploadImageController = require("../controllers/uploadImageController.js")

router.post('/',uploadImageController.uploadImageInfo,uploadImageController.uploadImage)
router.get('/',uploadImageController.getUploadImage)
module.exports = router;