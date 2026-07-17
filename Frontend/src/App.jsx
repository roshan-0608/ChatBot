// import { useState, useEffect } from 'react'
// import {ChatMessages} from './components/Chatmessages.jsx'
// import { ChatInput} from './components/ChatInput.jsx'
// import './App.css'

// function App() {
//   const [chatMessages, setChatMessages] = useState(
//     JSON.parse(localStorage.getItem('messages')) || []
//   );

//   const [chatSessionId, setChatSessionId] = useState(
//     localStorage.getItem("chatSessionId") || null
// );

//   useEffect(() => {
//     localStorage.setItem(
//       'messages',
//       JSON.stringify(chatMessages)
//     );
//   }, [chatMessages]); 

//   useEffect(() => {
//     if (chatSessionId) {
//         localStorage.setItem(
//             "chatSessionId",
//             chatSessionId
//         );
//     }
// }, [chatSessionId]);

  

//   // const [chatMessages, setChatMessages] = array;
//   // const chatMessages = array[0];
//   // const setChatMessages = array[1];

//   return (
//     <div className="app-container">
//       <p className = "para"> {chatMessages.length === 0 ? ("Welcome to the chatbot project! Send a message using the textbox below.") : ""} </p>
//       <ChatMessages
//         chatMessages={chatMessages}
//       />
//       <ChatInput
//         chatMessages={chatMessages}
//         setChatMessages={setChatMessages}
//         chatSessionId={chatSessionId}
//         setChatSessionId={setChatSessionId}
//       />
//     </div>
//   );
// }

// export default App


import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;