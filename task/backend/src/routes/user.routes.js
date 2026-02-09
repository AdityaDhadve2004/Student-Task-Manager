import {Router} from "express"
import { loginUser,logoutUser,getCurrentUser,registerUser } from "../controllers/user.controller"
import {upload} from "../middlewares/multer.js"
import { verifyJWT } from "../middlewares/auth.js";


const router = Router()

router.route("/register").post(upload.single("avatar"),registerUser)

router.route("/login").post(loginUser)

router.route("/current-user").get(verifyJWT,getCurrentUser)

router.route("/logout").post(verifyJWT,logoutUser)

export default router