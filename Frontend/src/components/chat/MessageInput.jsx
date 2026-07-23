import { useState, useRef, useEffect } from "react";
import { useChat } from "../../context/chat-context.js";
import { SendIcon, AttachIcon } from "../common/icons.jsx";
import "./MessageInput.css";

export function MessageInput() {
    const [inputText, setInputText] = useState("");
    const { sendMessage, isSending } = useChat();
    const textareaRef = useRef(null);

    // Auto-resize the textarea to fit its content, up to a max height.
    useEffect(() => {
        const ta = textareaRef.current;
        if (!ta) return;
        ta.style.height = "auto";
        ta.style.height = `${Math.min(ta.scrollHeight, 200)}px`;
    }, [inputText]);

    const handleSend = async () => {
        const text = inputText.trim();
        if (isSending || text === "") return;
        setInputText("");
        await sendMessage(text);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const canSend = inputText.trim() !== "" && !isSending;

    return (
        <div className="message-input-wrap">
            <div className="message-input">
                <button
                    type="button"
                    className="input-attach-btn"
                    disabled
                    aria-label="Attach file (coming soon)"
                    title="Attach file (coming soon)"
                >
                    <AttachIcon />
                </button>

                <textarea
                    ref={textareaRef}
                    className="message-input-textarea"
                    placeholder="Send a message..."
                    rows={1}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button
                    type="button"
                    className="input-send-btn"
                    onClick={handleSend}
                    disabled={!canSend}
                    aria-label="Send message"
                >
                    <SendIcon />
                </button>
            </div>
            <p className="message-input-hint">
                Press <strong>Enter</strong> to send, <strong>Shift + Enter</strong> for a new line
            </p>
        </div>
    );
}
