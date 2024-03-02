const express = require('express')
const { uploadFile } = require('../Controllers/upload')
const { upload } = require('../multer')
const router = express.Router()

router.post('/upload', upload.single("file"), uploadFile)

module.exports = router