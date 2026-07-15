import {ChatMessage} from './Chatmessage.jsx'
import {useAutoScroll} from './AutoScroll.jsx'
import './Chatmessages.css'

export function ChatMessages({ chatMessages }) {
        const chatMessagesRef = useAutoScroll([chatMessages]);
        return (
          <div className="chat-messages-container" ref={chatMessagesRef}>
            {chatMessages.map((chatMessage) => {
              return (
                <ChatMessage
                  message={chatMessage.message}
                  sender={chatMessage.sender}
                  key={chatMessage.id}
                />
              );
            })}
          </div>
        );
      }