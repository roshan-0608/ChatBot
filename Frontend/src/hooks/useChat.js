import { useState, useEffect, useRef } from "react";
import {
    createChatSession,
    getAllChatSessions,
    updateChatSession,
    deleteChatSession,
} from "../services/chat.service.js";
import { getMessages, sendMessage as sendMessageAPI } from "../services/message.service.js";

function toDisplayMessages(backendMessages) {
    return backendMessages.map((m) => ({
        id: m._id,
        message: m.content,
        sender: m.role === "user" ? "user" : "robot",
    }));
}

export function useChat() {
    const [sessions, setSessions] = useState([]);
    const [activeSessionId, setActiveSessionId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoadingSessions, setIsLoadingSessions] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const hasLoadedRef = useRef(false);

    const selectSession = async (sessionId) => {
        setActiveSessionId(sessionId);
        try {
            const res = await getMessages(sessionId);
            setMessages(toDisplayMessages(res.data));
        } catch (error) {
            console.error(error);
            setMessages([]);
        }
    };

    useEffect(() => {
        // Guard against React StrictMode double-invoking this effect in dev,
        // which would re-fetch sessions and clobber an in-progress optimistic send.
        if (hasLoadedRef.current) return;
        hasLoadedRef.current = true;

        async function loadSessions() {
            try {
                const res = await getAllChatSessions();
                const list = res.data || [];
                setSessions(list);
                if (list[0]) {
                    await selectSession(list[0]._id);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingSessions(false);
            }
        }
        loadSessions();
    }, []);

    const createChat = async () => {
        const res = await createChatSession();
        const newSession = res.data;
        setSessions((prev) => [newSession, ...prev]);
        setActiveSessionId(newSession._id);
        setMessages([]);
        return newSession;
    };

    const sendMessage = async (content) => {
        if (!content || isSending) return;

        let sessionId = activeSessionId;
        if (!sessionId) {
            const newSession = await createChat();
            sessionId = newSession._id;
        }

        const pendingId = crypto.randomUUID();

        setMessages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), message: content, sender: "user" },
            { id: pendingId, message: null, sender: "robot", isLoading: true },
        ]);
        setIsSending(true);

        try {
            const res = await sendMessageAPI(sessionId, content);
            const assistantMessage = res.data.assistantMessage;
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === pendingId
                        ? { id: assistantMessage._id, message: assistantMessage.content, sender: "robot" }
                        : m
                )
            );
        } catch (error) {
            console.error(error);
            setMessages((prev) => prev.filter((m) => m.id !== pendingId));
        } finally {
            setIsSending(false);
        }
    };

    const renameChat = async (sessionId, title) => {
        const res = await updateChatSession(sessionId, title);
        setSessions((prev) => prev.map((s) => (s._id === sessionId ? res.data : s)));
    };

    const deleteChat = async (sessionId) => {
        await deleteChatSession(sessionId);
        setSessions((prev) => prev.filter((s) => s._id !== sessionId));
        if (activeSessionId === sessionId) {
            setActiveSessionId(null);
            setMessages([]);
        }
    };

    const activeSession = sessions.find((s) => s._id === activeSessionId) || null;

    return {
        sessions,
        activeSessionId,
        activeSession,
        messages,
        isLoadingSessions,
        isSending,
        selectSession,
        createChat,
        sendMessage,
        renameChat,
        deleteChat,
    };
}
