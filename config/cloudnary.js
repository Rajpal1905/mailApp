const cloudinary = require('cloudinary')

exports.cloudinaryConnetion = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        })

    }
    catch (Error){
        console.error('error occuered in cloudaryConnection',Error)
    }
}