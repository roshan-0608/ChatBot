import { ChatProvider } from '../context/ChatContext.jsx'
import { Sidebar } from '../components/sidebar/Sidebar.jsx'
import { ChatWindow } from '../components/chat/ChatWindow.jsx'
import './ChatPage.css'

export default function ChatPage() {
  return (
    <ChatProvider>
      <div className="chat-layout">
        <Sidebar />
        <ChatWindow />
      </div>
    </ChatProvider>
  );
}
