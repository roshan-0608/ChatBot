import { useAuth } from "../../context/auth-context.js";
import { useChat } from "../../context/chat-context.js";
import "./ChatHeader.css";

export function ChatHeader() {
    const { user } = useAuth();
    const { activeSession } = useChat();

    const title = activeSession?.title || "New Chat";
    const model = activeSession?.model || "gemini-2.5-flash";

    return (
        <header className="chat-header">
            <div className="chat-header-info">
                <h1 className="chat-header-title">{title}</h1>
                <div className="chat-header-meta">
                    <span className="chat-header-status">
                        <span className="chat-header-status-dot" />
                        Online
                    </span>
                    <span className="chat-header-model">{model}</span>
                </div>
            </div>

            <button className="chat-header-profile" aria-label="Profile">
                {user?.username?.[0]?.toUpperCase()}
            </button>
        </header>
    );
}
