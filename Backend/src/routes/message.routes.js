import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { getMessages,
    sendMessage
} from "../controllers/message.controller.js";

const router = Router();

router.route("/")
    .post(verifyJWT, sendMessage);
router.route("/:chatSessionId")
    .get(verifyJWT, getMessages);

export default router;