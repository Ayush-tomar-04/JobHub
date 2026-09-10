const mongoose = require("mongoose")

require("dotenv").config()

const dbConnect = async()=>{

    try{
    await mongoose.connect(process.env.DATABASE_URL)

        console.log("Connection Sucsessful")
    }
    catch(err){
        console.log("Connection Failed")
        console.log(err)
        process.exit(1)
    }
}
module.exports = dbConnect;