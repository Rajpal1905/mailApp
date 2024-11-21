const mongoose = require("mongoose");
const nodemailer = require('nodemailer')

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
});

//post middleware

fileSchema.post("save",async function(doc) {
    try {
        

        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }

        });
        // sending mail 

        let info = await transporter.sendMail({
            from: '"LearnJet" <no-reply@learnjet.com>', // Sender's details
            to: doc.email,                              // Recipient's email
            subject: "New File Uploaded to Cloudinary", // Email subject
            html: `
                <h2>Hello!</h2>
                <p>A new file has been uploaded. You can view it by clicking the link below:</p>
                <a href="${doc.imageUrl}" target="_blank">${doc.imageUrl}</a>
            `, // HTML content of the email
        });
        
        
        
    } catch (error) {
        console.error(error)
    }
})

const File = mongoose.model('File',fileSchema)
module.exports = File