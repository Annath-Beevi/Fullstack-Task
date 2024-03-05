const File = require('../Models/file');
const ErrorHandler = require('../utils/ErrorHandler');
const fs = require('fs').promises;
const { PDFDocument } = require('pdf-lib')

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

const createNewPdf = async (req, res, next) => {
    const filePath = req.query.filePath;
    const pagesNumber = req.query.pages;

    if (!filePath || !pagesNumber) {
        return next(new ErrorHandler('Missing parameters', 400))
    }

    const pages = pagesNumber.split(',').map(Number).filter(Number.isInteger);

    if (pages.length === 0) {
        return next(new ErrorHandler('Invalid page numbers', 400))
    }

    try {
        const originalPdfBytes = await fs.readFile(filePath)

        const pdfDoc = await PDFDocument.load(originalPdfBytes)
        const extractedPdf = await PDFDocument.create()

        const copiedPage = await extractedPdf.copyPages(pdfDoc, pages)
        copiedPage.forEach((page) => extractedPdf.addPage(page))

        const newPdfBytes = await extractedPdf.save()
        res.setHeader('Content-Type' , 'application/pdf');
        res.status(200).send(newPdfBytes)
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

module.exports = { uploadFile, getFile, createNewPdf }


