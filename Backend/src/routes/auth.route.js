import { Router } from "express";
import { registerUser , loginUser ,logoutUser, getCurrentUser, refreshAccessToken} from "../controllers/auth.controller.js";
import {verifyJWT} from "../middlewares/verifyJWT.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/currentUser").get(verifyJWT, getCurrentUser);
router.route("/refreshToken").post(refreshAccessToken);
export default router;