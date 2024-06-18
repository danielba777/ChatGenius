import React, { useState } from 'react'
import axios from 'axios'

const ChatbotScreen = () => {
  
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [response, setResponse] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/openai/chatbot", { text })
      setResponse(data)
    } catch (err) {
      console.log(err)
      const errorMsg = err.response && err.response.data.error ? err.response.data.error : err.message;
      setError(errorMsg);
      setTimeout(() => setError(""), 5000);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center sm:h-[calc(100vh-150px)]'>
      <form className='flex flex-col items-center gap-4 mt-16 sm:mt-0' onSubmit={submitHandler}>
        <h2 className='text-center text-2xl font-semibold mb-2'>Chat Bot</h2>
        {error && 
          <div className='flex items-center gap-2 rounded-md bg-red-100 text-red-500 py-3 px-4 w-[90vw] sm:w-80 '>
            <i className="fa-solid fa-circle-exclamation"></i>
            <h2>{error}</h2>
          </div>
        }
        <textarea
          className='border border-slate-400 py-3 px-4 w-[90vw] sm:w-[50vw] rounded-md duration-300 focus:outline-none'
          style={{ minHeight: '10vh', resize: 'none' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          placeholder='Your question...'
        />
        <button className='bg-blue-600 py-3 px-4 rounded-md w-[90vw] sm:w-80 text-white duration-300 hover:bg-blue-700' type='submit'>Ask</button>
      </form>
      {response ? (
        <div className='border border-slate-400 rounded-md w-[90vw] min-h-[50vh] sm:w-[50vw] p-2 mt-8 bg-slate-100'>
          <p>{response}</p>
        </div>
      ) : (
        <div className='flex items-center justify-center border border-slate-400 rounded-md w-[90vw] min-h-[50vh] sm:w-[50vw] p-2 mt-8 bg-slate-100'>
          <h2 className='text-xl'>Your chat will appear here.</h2>
        </div>
      )}
    </div>
  )
}

export default ChatbotScreen