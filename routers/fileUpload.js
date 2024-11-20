const router = require('express').Router()

const { localFileUpload, imageUpload, uploadVideo, uploadReducedImageMannually, UploadReducedImage } = require('../controllers/fileUpload')


router.post("/localfileupload",localFileUpload)
router.post("/uploadFile",imageUpload)
router.post("/videoUpload",uploadVideo)
router.post("/uploadReducedImage",uploadReducedImageMannually)
router.post('/reduceWhileUploading',UploadReducedImage)

module.exports = router

