
import express from "express"
import createUser from "../controller/User.js"
const  router = express.Router()


router.post("/users", createUser)


export default router