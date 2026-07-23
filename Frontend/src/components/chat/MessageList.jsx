import { MessageBubble } from "./MessageBubble.jsx";
import { useAutoScroll } from "../../hooks/useAutoScroll.js";
import "./MessageList.css";

export function MessageList({ chatMessages }) {
    const listRef = useAutoScroll([chatMessages]);

    return (
        <div className="message-list" ref={listRef}>
            {chatMessages.map((chatMessage) => (
                <MessageBubble
                    key={chatMessage.id}
                    message={chatMessage.message}
                    sender={chatMessage.sender}
                    isLoading={chatMessage.isLoading}
                />
            ))}
        </div>
    );
}
