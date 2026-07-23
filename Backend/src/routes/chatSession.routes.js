import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJWT.js";
import { createChatSession, 
    getAllChatSessions, 
    getChatSessionById,
    updateChatSession,
    deleteChatSession
} from "../controllers/chatSession.controller.js";

const router = Router();

router.route("/")
    .post(verifyJWT, createChatSession)
    .get(verifyJWT, getAllChatSessions);

router.route("/:chatSessionId")
    .get(verifyJWT, getChatSessionById)
    .patch(verifyJWT, updateChatSession)
    .delete(verifyJWT, deleteChatSession);
export default router;