import { ChatContext } from "./chat-context.js";
import { useChat as useChatState } from "../hooks/useChat.js";

export function ChatProvider({ children }) {
    const chat = useChatState();

    return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}
