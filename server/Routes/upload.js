const express = require('express')
const { uploadFile, getFile } = require('../Controllers/upload')
const { upload } = require('../multer')
const router = express.Router()

router.post('/upload', upload.single("file"), uploadFile)
router.get('/getFile/:id', getFile)

module.exports = router