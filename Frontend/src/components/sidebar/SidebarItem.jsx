import { useState } from "react";
import { PencilIcon, TrashIcon } from "../common/icons.jsx";

export function SidebarItem({ session, isActive, onSelect, onRename, onDeleteRequest }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftTitle, setDraftTitle] = useState(session.title);

    const startEditing = (e) => {
        e.stopPropagation();
        setDraftTitle(session.title);
        setIsEditing(true);
    };

    const submitRename = () => {
        setIsEditing(false);
        const trimmed = draftTitle.trim();
        if (trimmed && trimmed !== session.title) {
            onRename(trimmed);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") submitRename();
        if (e.key === "Escape") {
            setIsEditing(false);
            setDraftTitle(session.title);
        }
    };

    return (
        <li
            className={isActive ? "sidebar-chat-item active" : "sidebar-chat-item"}
            onClick={!isEditing ? onSelect : undefined}
        >
            {isEditing ? (
                <input
                    className="sidebar-chat-rename-input"
                    value={draftTitle}
                    autoFocus
                    onChange={(e) => setDraftTitle(e.target.value)}
                    onBlur={submitRename}
                    onKeyDown={handleKeyDown}
                    onClick={(e) => e.stopPropagation()}
                />
            ) : (
                <span className="sidebar-chat-title">{session.title}</span>
            )}

            {!isEditing && (
                <span className="sidebar-chat-actions">
                    <button className="sidebar-icon-button" onClick={startEditing} aria-label="Rename chat">
                        <PencilIcon />
                    </button>
                    <button
                        className="sidebar-icon-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteRequest();
                        }}
                        aria-label="Delete chat"
                    >
                        <TrashIcon />
                    </button>
                </span>
            )}
        </li>
    );
}
