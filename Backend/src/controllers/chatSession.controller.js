import { ChatSession } from "../models/chatSession.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createChatSession = asyncHandler(async (req, res) => {

    const chatSession = await ChatSession.create({

        ownerId: req.user._id,

        title: "New Chat"

    });

    return res.status(201).json(

        new ApiResponse(

            201,

            chatSession,

            "Chat session created successfully"

        )

    );

});

const getAllChatSessions = asyncHandler(async (req, res) => {

    const chatSessions = await ChatSession.find({
        ownerId: req.user._id,
        deletedAt: null
    }).sort({
        updatedAt: -1
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            chatSessions,
            "Chat sessions fetched successfully"
        )
    );

});

const getChatSessionById = asyncHandler(async (req, res) => {

    const { chatSessionId } = req.params;

    const chatSession = await ChatSession.findOne({
        _id: chatSessionId,
        ownerId: req.user._id,
        deletedAt: null,
    });

    if (!chatSession) {
        throw new ApiError(404, "Chat session not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            chatSession,
            "Chat session fetched successfully"
        )
    );

});

const updateChatSession = asyncHandler(async (req, res) => {

    const { chatSessionId } = req.params;
    const { title } = req.body;

    if (!title) {
        throw new ApiError(400, "Title is required");
    }

    const chatSession = await ChatSession.findOneAndUpdate(
        {
            _id: chatSessionId,
            ownerId: req.user._id,
            deletedAt: null
        },
        {
            title
        },  /// above and below are the steps where the title is getting updated in the chat session document in the database. 
        /// The first object is the filter to find the specific chat session, and the second object is the update operation that sets the new title.
        // if new != true mongodb will return the old document before the update. If new is set to true, it will return the updated document after the update.
        {
            new: true
        }
    );

    if (!chatSession) {
        throw new ApiError(404, "Chat session not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            chatSession,
            "Chat session updated successfully"
        )
    );

});

const deleteChatSession = asyncHandler(async (req, res) => {

    const { chatSessionId } = req.params;

    const chatSession = await ChatSession.findOneAndUpdate(
        {
            _id: chatSessionId,
            ownerId: req.user._id,
            deletedAt: null
        },
        {
            deletedAt: new Date()
        },
        {
            new: true
        }
    );

    if (!chatSession) {
        throw new ApiError(404, "Chat session not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Chat session deleted successfully"
        )
    );

});
export { createChatSession, getAllChatSessions, getChatSessionById , updateChatSession, deleteChatSession};