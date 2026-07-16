import api from "../api/api";

export const createChatSession = async () => {
    const response = await api.post("/chat-session");

    return response.data;
};