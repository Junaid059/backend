import { Router } from "express";
import { registerUser } from "../controllers/user.js";
import { upload } from "../middlewares/multer.js";
const router = Router();

router.route("/register").post(
  // using middleware for user to upload many vids/pics
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },

    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
export default router;
