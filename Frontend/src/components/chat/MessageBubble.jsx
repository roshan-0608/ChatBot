import { useAuth } from "../../context/auth-context.js";
import { Avatar } from "../common/Avatar.jsx";
import { TypingIndicator } from "./TypingIndicator.jsx";
import { MarkdownRenderer } from "./MarkdownRenderer.jsx";
import { MarkdownErrorBoundary } from "./MarkdownErrorBoundary.jsx";
import "./MessageBubble.css";

export function MessageBubble({ message, sender, isLoading }) {
    const { user } = useAuth();
    const isUser = sender === "user";

    const renderRobotContent = () => {
        if (isLoading) return <TypingIndicator />;
        return (
            <MarkdownErrorBoundary content={message}>
                <MarkdownRenderer content={message} />
            </MarkdownErrorBoundary>
        );
    };

    return (
        <div className={isUser ? "msg-row msg-row-user" : "msg-row msg-row-robot"}>
            {!isUser && <Avatar type="robot" />}

            <div className={isUser ? "msg-bubble msg-bubble-user" : "msg-bubble msg-bubble-robot"}>
                {isUser ? message : renderRobotContent()}
            </div>

            {isUser && <Avatar type="user" initial={user?.username?.[0]?.toUpperCase()} />}
        </div>
    );
}
