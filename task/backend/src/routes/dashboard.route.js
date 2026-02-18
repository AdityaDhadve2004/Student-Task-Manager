import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.js";
import { totalTaskCount } from "../controllers/dashboard.controller.js";

const router = Router()

router.route("/").get(verifyJWT,totalTaskCount)

export default router