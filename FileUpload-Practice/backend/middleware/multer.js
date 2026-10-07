const multer = require("multer")

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + "-" + file.originalname)
    }
    
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype!=="application/pdf"){
        cb(new Error("File only accepted in pdf format"))
        return 
    }
    cb(null,true)
}
const limits ={
    fileSize:5*1024*1024
}

const upload = multer({
    storage: storage,
    fileFilter:fileFilter,
    limits:limits
})



module.exports = upload