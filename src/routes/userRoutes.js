import { Router } from "express";
import { registerUser } from "../controllers/useController.js";
import {upload} from "../middlewares/multer.middleware.js"
import validationMiddleware from "../middlewares/zod.middleware.js";
const router = Router()

router.route("/register").post(validationMiddleware,
    upload.fields([
        {
            name: avatar,
            maxCount:  1
        }, {
            name: coverImage,
            maxCount:2
        }
    ])
    ,registerUser)

export default router