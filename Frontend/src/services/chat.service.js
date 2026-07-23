import api from "../Api/api";

export const createChatSession = async () => {
    const response = await api.post("/chat-session");

    return response.data;
};

export const getAllChatSessions = async () => {
    const response = await api.get("/chat-session");

    return response.data;
};

export const getChatSessionById = async (chatSessionId) => {
    const response = await api.get(`/chat-session/${chatSessionId}`);

    return response.data;
};

export const updateChatSession = async (chatSessionId, title) => {
    const response = await api.patch(`/chat-session/${chatSessionId}`, { title });

    return response.data;
};

export const deleteChatSession = async (chatSessionId) => {
    const response = await api.delete(`/chat-session/${chatSessionId}`);

    return response.data;
};