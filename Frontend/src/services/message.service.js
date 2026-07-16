import api from "../Api/api";

export const sendMessage = async (chatSessionId, content) => {
    const response = await api.post("/message", {
        chatSessionId,
        content,
    });

    return response.data;
};