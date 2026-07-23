import api from "../Api/api";

export const sendMessage = async (chatSessionId, content) => {
    const response = await api.post("/message", {
        chatSessionId,
        content,
    });

    return response.data;
};

export const getMessages = async (chatSessionId) => {
    const response = await api.get(`/message/${chatSessionId}`);

    return response.data;
};