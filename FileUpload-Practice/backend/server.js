const express = require("express")

const app = express()

const PORT = 5000
app.use(express.json())
const router = require("./Route/route")

app.use("/api/v1/",router)

app.listen(PORT,()=>{
    console.log(`Server run successfully at port ${PORT}`)
})