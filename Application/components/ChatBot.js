import React, { useState } from 'react';
import axios from 'axios';
import { MdChat } from 'react-icons/md';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 300, height: 400 });

  const formatMessageContent = (content) => {
    // Replace headers
    content = content.replace(/## (.+)/g, '<h2>$1</h2>');
    // Replace bold text
    content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Replace new lines with <br />
    content = content.replace(/\n/g, '<br />');
    return content;
  };

  const sendMessage = async (messageContent) => {
    if (messageContent.trim() === '') return;

    const newMessage = { role: 'user', content: messageContent };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput(''); // Clear input immediately after sending

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBTCTTp7A43gTJf48I5meGaeM6kw0yjprE',
        {
          contents: [
            {
              parts: [
                {
                  text: messageContent
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const textContent = response.data.candidates[0].content.parts[0].text;
      const assistantMessage = { role: 'assistant', content: textContent };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInput(''); // Clear input after sending
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage(input);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handlePromptClick = (prompt) => {
    sendMessage(prompt);
  };

  const handleResize = (e, { size }) => {
    const increment = 10; // Adjust increment as needed
    const newWidth = Math.max(200, Math.min(600, Math.round(size.width / increment) * increment));
    const newHeight = Math.max(300, Math.min(600, Math.round(size.height / increment) * increment));

    // Adjust the position of the chat bot container
    const newBottom = dimensions.height - newHeight + 70; // 70 is the initial bottom offset
    const newRight = dimensions.width - newWidth + 20; // 20 is the initial right offset

    setDimensions(prevDimensions => ({
      width: newWidth,
      height: newHeight
    }));

    // Update the chat bot container position
    const chatBotElement = document.querySelector('.chat-bot');
    chatBotElement.style.bottom = `${newBottom}px`;
    chatBotElement.style.right = `${newRight}px`;
  };

  return (
    <div className="chat-bot-container">
      <button className="chat-bot-button" onClick={toggleChat}>
        <MdChat size={24} />
      </button>
      {isOpen && (
        <ResizableBox
          className="chat-bot"
          width={dimensions.width}
          height={dimensions.height}
          minConstraints={[200, 300]}
          maxConstraints={[600, 600]}
          resizeHandles={['nw']}
          handle={<span className="custom-resize-handle" />}
          onResize={handleResize}
        >
          <div className="chat-content">
            <div className="chat-header">
              <h2>Food Finder Assistant</h2>
              <button className="close-button" onClick={toggleChat}>
                &times;
              </button>
            </div>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.role}`}>
                  <div dangerouslySetInnerHTML={{ __html: formatMessageContent(msg.content) }} />
                </div>
              ))}
            </div>
            <div className="chat-input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
              />
              <button onClick={() => sendMessage(input)}>Send</button>
            </div>
            <div className="chat-prompts">
              <button onClick={() => handlePromptClick('Đưa ra những món ăn giàu protein')}>Món ăn giàu protein</button>
              <button onClick={() => handlePromptClick('Xây dựng thực đơn 7 ngày')}>Thực đơn 7 ngày</button>
              <button onClick={() => handlePromptClick('Tìm quán ăn 5 sao gần nhất')}>Tìm quán ăn 5 sao</button>
              <button onClick={() => handlePromptClick('Tìm quán ăn gần nhất')}>Tìm quán ăn gần nhất</button>
            </div>
          </div>
        </ResizableBox>
      )}
    </div>
  );
};

export default ChatBot;
