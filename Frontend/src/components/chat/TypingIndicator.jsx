import "./TypingIndicator.css";

export function TypingIndicator() {
    return (
        <div className="typing-indicator" aria-label="Assistant is typing">
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}
