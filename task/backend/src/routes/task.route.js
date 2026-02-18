import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.js";
import { createTask,getTask,updateTask,deleteTask,getAllTasks,toggleTaskStatus } from "../controllers/task.controller.js";

const router = Router()

router.route("/").post(verifyJWT,createTask)
router.route("/").get(verifyJWT,getAllTasks)
router.route("/").patch(verifyJWT,toggleTaskStatus)
router.route("/:taskId").get(verifyJWT,getTask)
router.route("/:taskId").patch(verifyJWT,updateTask)
router.route("/:taskId").delete(verifyJWT,deleteTask)


export default router
