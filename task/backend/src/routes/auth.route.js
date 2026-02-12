import express from "express"
import { verifyJWT } from "../middlewares/auth.js"

const router = express.Router()


router.get("/me", verifyJWT, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  })
})


router.route("/me").get(verifyJWT, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  })
})

export default router
