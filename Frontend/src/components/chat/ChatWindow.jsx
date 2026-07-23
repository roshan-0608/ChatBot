import { MessageList } from "./MessageList.jsx";
import { MessageInput } from "./MessageInput.jsx";
import { ChatHeader } from "./ChatHeader.jsx";
import { useChat } from "../../context/chat-context.js";
import "./ChatWindow.css";

export function ChatWindow() {
    const { messages, isLoadingSessions } = useChat();

    return (
        <main className="chat-window">
            <ChatHeader />

            <div className="chat-window-body">
                <div className="chat-window-center">
                    {!isLoadingSessions && messages.length === 0 && (
                        <p className="chat-window-empty-hint">
                            Welcome to the chatbot project! Send a message using the textbox below.
                        </p>
                    )}
                    <MessageList chatMessages={messages} />
                </div>
            </div>

            <div className="chat-window-input-area">
                <div className="chat-window-center">
                    <MessageInput />
                </div>
            </div>
        </main>
    );
}
