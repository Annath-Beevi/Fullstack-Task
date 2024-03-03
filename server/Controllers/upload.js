const File = require('../Models/file')
const ErrorHandler = require('../utils/ErrorHandler')

const uploadFile = async (req, res, next) => {
    const fileName = req.file.filename;
    try {
        const file = new File({
            file: fileName
        })

        const fileUpload = await file.save()
        res.status(200).json(fileUpload)

    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

const getFile = async (req, res, next) => {
    const { id } = req.params;
    const pdf = await File.findById(id);
    if (!pdf) {
        return next(new ErrorHandler('PDF not found', 404))
    }
    res.json(pdf);
}

module.exports = { uploadFile, getFile }

