const mongoose = require('mongoose')

require('dotenv').config()

exports.dbConnection =()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser : true,
        useUnifiedTopology:true

    }).then (()=>{console.log('Db connection done !!')})  
    .catch((err)=>{console.error("Ohh! something wrong with Db connection",err)
        process.exit(1)
    })
} 
    