import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context.js";
import { useChat } from "../../context/chat-context.js";
import { SidebarItem } from "./SidebarItem.jsx";
import { SearchBar } from "./SearchBar.jsx";
import { ConfirmationDialog } from "../common/ConfirmationDialog.jsx";
import { PlusIcon, LogoutIcon } from "../common/icons.jsx";
import "./Sidebar.css";

export function Sidebar() {
    const { user, logout } = useAuth();
    const { sessions, activeSessionId, selectSession, createChat, renameChat, deleteChat } = useChat();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const filteredSessions = useMemo(() => {
        if (!searchTerm.trim()) return sessions;
        const term = searchTerm.trim().toLowerCase();
        return sessions.filter((s) => s.title.toLowerCase().includes(term));
    }, [sessions, searchTerm]);

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    const handleDeleteConfirm = async () => {
        const id = pendingDeleteId;
        setPendingDeleteId(null);
        await deleteChat(id);
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-top">
                <div className="sidebar-logo">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 11.5L12 4l9 7.5" />
                        <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
                    </svg>
                    <span>Chatbot</span>
                </div>

                <button className="sidebar-new-chat" onClick={() => createChat()}>
                    <PlusIcon />
                    New Chat
                </button>

                <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>

            <div className="sidebar-history">
                <p className="sidebar-section-label">Chats</p>
                <ul className="sidebar-chat-list">
                    {filteredSessions.map((session) => (
                        <SidebarItem
                            key={session._id}
                            session={session}
                            isActive={session._id === activeSessionId}
                            onSelect={() => selectSession(session._id)}
                            onRename={(title) => renameChat(session._id, title)}
                            onDeleteRequest={() => setPendingDeleteId(session._id)}
                        />
                    ))}
                    {filteredSessions.length === 0 && (
                        <li className="sidebar-empty-hint">
                            {searchTerm ? "No chats match your search." : "No chats yet."}
                        </li>
                    )}
                </ul>
            </div>

            <div className="sidebar-profile">
                <div className="sidebar-profile-avatar">{user?.username?.[0]?.toUpperCase()}</div>
                <span className="sidebar-username">{user?.username}</span>
                <button onClick={handleLogout} className="sidebar-logout-button" aria-label="Logout">
                    <LogoutIcon />
                </button>
            </div>

            <ConfirmationDialog
                isOpen={pendingDeleteId !== null}
                title="Delete chat?"
                message="This will permanently delete this conversation. This can't be undone."
                confirmLabel="Delete"
                onConfirm={handleDeleteConfirm}
                onCancel={() => setPendingDeleteId(null)}
            />
        </aside>
    );
}
