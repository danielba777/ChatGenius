import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

const ChatbotScreen = () => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newMessage = { text: text, sender: 'user' };
    setMessages([...messages, newMessage]); // Add user message to messages
    try {
      const { data } = await axios.post("/api/openai/chatbot", { text });
      setMessages(prev => [...prev, { text: data, sender: 'bot' }]); // Add bot response to messages
      setText(''); // Clear input after sending
    } catch (err) {
      console.log(err);
      const errorMsg = err.response && err.response.data.error ? err.response.data.error : err.message;
      setError(errorMsg);
      setTimeout(() => setError(""), 5000);
    }
  }

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-4 flex flex-col justify-center items-center'>
        <div className='h-[70vh] w-full max-w-4xl overflow-y-auto bg-white shadow-md rounded-lg p-4'>
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded-lg text-white my-1 ${msg.sender === 'user' ? 'bg-blue-500 ml-auto' : 'bg-gray-600 mr-auto'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <form className='w-full max-w-4xl mt-4 flex' onSubmit={submitHandler}>
          <textarea
            className='flex-grow py-2 px-4 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500 resize-none overflow-hidden'
            style={{ maxHeight: '40px' }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Your question...'
            required
          />
          <button className='bg-blue-500 text-white rounded-r-full px-4 py-1 hover:bg-blue-600' type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default ChatbotScreen;

