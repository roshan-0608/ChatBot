import { useState, useEffect } from 'react'
import {ChatMessages} from './components/Chatmessages.jsx'
import { ChatInput} from './components/ChatInput.jsx'
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem('messages')) || []
  );

  useEffect(() => {
    localStorage.setItem(
      'messages',
      JSON.stringify(chatMessages)
    );
  }, [chatMessages]); 

  

  // const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];

  return (
    <div className="app-container">
      <p className = "para"> {chatMessages.length === 0 ? ("Welcome to the chatbot project! Send a message using the textbox below.") : ""} </p>
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
