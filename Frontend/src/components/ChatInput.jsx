import {useState} from 'react'
import {createChatSession} from '../services/chatSession.service.js'
import {sendMessage as sendMessageAPI} from '../services/message.service.js'
import LoadingSpinner from '../assets/loading-spinner.gif'
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages, chatSessionId, setChatSessionId  }) {
    const [inputText, setInputText] = useState('');
    const [isloading, setIsLoading] = useState(false);
    function saveInputText(event) {
        setInputText(event.target.value);
    }


    async function sendMessage() {
        if(isloading || inputText === ""){
        return;
        }

        let currentChatSessionId = chatSessionId;
        if (!currentChatSessionId) {
            const chat = await createChatSession();
            currentChatSessionId = chat.data._id;
            setChatSessionId(currentChatSessionId);
        }
        
        setInputText('');
        setIsLoading(true);
        const newChatMessages = [
        ...chatMessages,
        {
            message: inputText,
            sender: 'user',
            id: crypto.randomUUID()
        }
        ];

        setChatMessages(newChatMessages);
        setChatMessages([
        ...newChatMessages,
        {
            message: <img src = {LoadingSpinner} className = "loading-spinner"/>,
            sender: 'robot',
            id: crypto.randomUUID()
        }
        ]);

        try {
            const response = await sendMessageAPI(
                currentChatSessionId,
                inputText
            );
            const aiMessage = response.data.assistantMessage.content;
            setChatMessages([
                ...newChatMessages,
                {
                    message: aiMessage,
                    sender: "robot",
                    id: crypto.randomUUID()
                }
            ]);
        }
        catch(error){
            console.error(error);
        }
        finally{
            setIsLoading(false);
        }
    }

    function handlekeydown(event){
        if(event.key == "Enter"){
            sendMessage();
        }
        else if(event.key == "Escape"){
            setInputText('');
        }
    }

    const clearChat = () => {
        setChatMessages([]);
        setChatSessionId(null);
        localStorage.removeItem("messages");
        localStorage.removeItem("chatSessionId");
    }
    return (
        <div className="chat-input-container">
        <input
            placeholder="Send a message to Chatbot"
            size="30"
            onChange={saveInputText}
            onKeyDown={handlekeydown}
            value={inputText}
            className="chat-input"
        />
        <button
            onClick={sendMessage}
            className="send-button"
        >Send</button>
        <button onClick = {clearChat} className = "clear-btn">Clear</button>
        </div>
    );
}