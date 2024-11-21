//create app
const e = require('express')
const express = require('express')

const app = express()

require('dotenv').config()

//Port find kro
const PORT = process.env.PORT || 5000


//middleware add kro
app.use(express.json())

const fileupload = require("express-fileupload")

app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))


//Connect with Db
require('./config/database').dbConnection()

//connect with cloudinary
require('./config/cloudnary').cloudinaryConnetion()


//mount api routes

const upload = require('./routers/fileUpload')

app.use('/api/v1/upload',upload)

// activate server

app.listen(PORT,()=>{
    console.log(`App is listen at ${PORT}`)
})

app.get('/',(req,res)=>{
    res.send('I love you Kake')
})