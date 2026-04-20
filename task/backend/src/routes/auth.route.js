import express from "express"
import { verifyJWT } from "../middlewares/auth.js"


import { getCurrentUser } from "../controllers/user.controller.js"

const router = express.Router()


router.route("/me").get(verifyJWT,getCurrentUser)


export default router
