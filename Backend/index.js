const express = require("express")
const app = express()

const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./docs/swagger")


require("dotenv").config()
const PORT = process.env.PORT || 4000;
app.use(express.json());

const router = require('./Routes/route')

app.use("/api/v1/",router)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const dbConnect = require("./config/database")
const startup = async () => {
try{
 await dbConnect() 
 app.listen(PORT,()=>{
    console.log(`Server started successfully at ${PORT}`)
})
    }
    catch(err){
        console.log("server not started because Connection is failed")
    }  
}
startup()

app.get("/",(req,res)=>{
    res.send("<h1>Hello This is JobHub Backend</h1>")
})
