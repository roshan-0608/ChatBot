import { Message } from "../models/message.model.js";
import { ChatSession } from "../models/chatSession.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { generateAIResponse } from "../services/gemini.service.js";

const getMessages = asyncHandler(async (req, res) => {

    const { chatSessionId } = req.params;

    // Check whether the chat belongs to the logged-in user
    const chatSession = await ChatSession.findOne({
        _id: chatSessionId,
        ownerId: req.user._id,
        deletedAt: null
    });

    if (!chatSession) {
        throw new ApiError(404, "Chat session not found");
    }

    // Get all messages of this chat
    const messages = await Message.find({
        chatSessionId
    }).sort({
        createdAt: 1
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            messages,
            "Messages fetched successfully"
        )
    );

});

const sendMessage = asyncHandler(async (req, res) => {

    const { chatSessionId, content } = req.body;

    // Validation
    if (!chatSessionId || !content) {
        throw new ApiError(400, "Chat Session ID and Content are required");
    }

    // Check ownership
    const chatSession = await ChatSession.findOne({
        _id: chatSessionId,
        ownerId: req.user._id,
        deletedAt: null
    });

    if (!chatSession) {
        throw new ApiError(404, "Chat session not found");
    }

    // Save user's message
    const userMessage = await Message.create({
        chatSessionId,
        role: "user",
        content
    });

    // Load conversation history
    const messages = await Message.find({
        chatSessionId
    }).sort({
        createdAt: 1
    });

    // Generate AI response
    const aiResponse = await generateAIResponse(messages);

    // Save AI response
    const assistantMessage = await Message.create({
        chatSessionId,
        role: "assistant",
        content: aiResponse
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                userMessage,
                assistantMessage
            },
            "User message saved successfully"
        )
    );

});

export {
    getMessages,
    sendMessage
};
