const File = require('../models/file')
const cloudinary = require('cloudinary').v2

exports.localFileUpload = async (req, res) => {
    try {

        //fetch file
        
        const file = req.files.file

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;// also going to add extension ' + '
        console.log(path, "This is Path")

        file.mv(path, (err) => {
            console.log(err);
        })

        res.json({
            status: true,
            message: 'local File Uploaded successfully'
        })
    } catch (error) {
        console.log(error)
    }
}

//image upload 

function isFileSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

// function for upload because we are going to use this function again and again

async function uploadFileToCloudinary(file, folder,quality) {
    const options = { folder }
    if(quality)
    {
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;

        console.log(name, tags, email,"   --->  This comes from body")

        const file = req.files.imageFile;
        console.log(file)

        const supportedTypes = ["jpg", "jpeg", "png"];

        const dotcount = file.name.split('.').length - 1;
        if(dotcount>1){
            return res.status(400).json({
                msg:"Change you file name which contain one dot"
            })
        }

        const fileType = file.name.split('.')[1].toLowerCase();

        if (!isFileSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                msg: "Your file Type is not allowed"
            });
        }


        const response = await uploadFileToCloudinary(file, 'Codehelp')
        console.log(response ,"Response")

        // now we have save the entry in db
        
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })
        
        res.status(200).json({
            status : true,
            image_data:response.secure_url,
            msg: "Image successfully uploaded"
        })

    } catch (error) {
        res.status(400).json({
            msg:"Some Issue occur while uploading image"
        })
        console.error("an error is occured",error)
    }
}

exports.uploadVideo = async(req,res)=>{
    try {
        //fetching data from body

        const {name,tags,email} = req.body;
        console.log("This comes from body",name,tags,email)

        const file = req.files.videoFile

        console.log(file)

        const supportedTypes = ["mp4","mov"]

        const fileType = file.name.split('.')[1].toLowerCase()

        //validation for video  extention
        if(!isFileSupported(fileType,supportedTypes)){
            return res.status(400).json({
                msg:"file types is not supported"
            })
        }

        // sending data to clooudinary
        const response = await uploadFileToCloudinary(file,"Codehelp")

        console.log(response)

        // save data into Db
        const fileData = await File.create ({
            name,
            email,
            tags,
            imageUrl:response.secure_url
        })

        res.status(200).json({
            status : true,
            image_data:response.secure_url,
            msg: "video successfully uploaded"
        })

        
    } catch (error) {
        return res.status(400).json({
            msg:"some error is occured"
        })
        console.error("an occur is occuered",error)
    }
}

exports.uploadReducedImageMannually = async(req,res)=>{
    try {
        // fetch data from body
        const {name,tags,email} = req.body 
        const file = req.files.imageFile
        const countDots = file.name.split('.').length-1;
        if(countDots>1)
        {
            return res.status(411).json({
                msg:"Make sure file name contain any dot "
            })
        }
        // validation
        //checking size of an image
        if(file.size>25000){
            return res.status(413).json({
                msg:"your file is too large to upload"
            })
        }
        //checking file is supported or not
        const supportedTypes = ["png","jpg","jpeg"]
        const type = file.name.split('.')[1].toLowerCase()
        if(!isFileSupported(type,supportedTypes)){
            return res.status(400).json({
                msg:"Your file type is not supported"
            })
        }
        const response = await uploadFileToCloudinary(file,"Codehelp")

        await File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url
        })
        res.status(201).json({
            msg:"Entery created in Db is successfuly"
        })

    } catch (error) {
        console.error("An error occured", error)
        res.send(500).json({
            msg:"Some error  is occured while uploading file on cloudinary and create entry in Db "
        })
    }
}

exports.UploadReducedImage = async (req,res) => {
    try {
        //fetching data 
        const {name,tags,email} = req.body;
        console.log(name,tags,email)
        const file = req.files.file

        const supportedTypes = ["png","jpg","jpeg"]
        const type = file.name.split('.')[1].toLowerCase()
        if(!isFileSupported(type,supportedTypes)){
            return res.status(400).json({
                msg:"Your file type is not supported"
            })
        }
        const response = await uploadFileToCloudinary(file,"Codehelp",10)

        await File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url
        })
        res.status(201).json({
            msg:"Entery created in Db is successfuly"
        })
    
    } catch (error) {
        console.error("An error occured", error)
        res.send(500).json({
            msg:"Some error  is occured while uploading file on cloudinary and create entry in Db "
        })
    }
}