const express = require("express")

const route = express.Router();

const {createJobHub} = require("../Controller/createJobHub")
const {createCompany} = require("../Controller/createCompany")
const {createEmployer} = require("../Controller/createEmployer")
const {createJob} = require("../Controller/createJob")

const {getJobs} = require("../Controller/getJobs")
const {getOneJob} = require("../Controller/getOneJob")

const {updateJob} = require("../Controller/updateJob")
const {deleteJob} = require("../Controller/deleteJob")
const {signup} = require("../Controller/signup")
const {login} = require("../Controller/login")
const {auth} = require("../middleware/auth")
const {employerAuth} = require("../middleware/employerAuth")

route.post("/user",createJobHub)
route.post("/company",createCompany)
route.post("/employer",createEmployer)
route.post("/jobs",auth,employerAuth,createJob)

route.get("/jobs",getJobs)
route.get("/jobs/:jobId",getOneJob)

route.put("/updateJob/:jobId",updateJob)
route.delete("/deleteJob/:jobId",deleteJob)

route.post("/signup",signup)
route.post("/login",login)


route.get("/health",(req,res)=>{
     res.json({
        message:"JobHub Api run successfully"
     })
})
module.exports = route