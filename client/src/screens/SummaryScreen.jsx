import React, { useState } from 'react'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

const SummaryScreen = () => {
  
  const [text, setText] = useState('')
  const [summary, setSummary] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data } = await axios.post("/api/openai/summary", { text })
      setSummary(data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      const errorMsg = err.response && err.response.data.error ? err.response.data.error : err.message;
      toast.error(errorMsg)
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col sm:flex-row'>
      <Sidebar />
      <div className='flex-1 flex flex-col justify-center items-center sm:h-[calc(100vh-150px)]'>
        <form className='flex flex-col items-center gap-4 mt-16 sm:mt-0' onSubmit={submitHandler}>
          <h2 className='text-center text-2xl font-semibold mb-2'>Text Summarizer</h2>
          <textarea
            className='border border-slate-400 py-3 px-4 w-[90vw] sm:w-[50vw] rounded-md duration-300 focus:outline-none'
            style={{ minHeight: '10vh', resize: 'none' }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            placeholder='Your text...'
          />
          <button className='bg-blue-600 py-3 px-4 rounded-md w-[90vw] sm:w-80 text-white duration-300 hover:bg-blue-700' type='submit'>Summarize</button>
        </form>
        {summary ? (
          <div className='border border-slate-400 rounded-md w-[90vw] min-h-[50vh] sm:w-[50vw] p-2 mt-8 bg-slate-100'>
            { isLoading ? (
              <Loader />
            ) : (
              <p>{summary}</p>
            )}
          </div>
        ) : (
          <div className='flex items-center justify-center border border-slate-400 rounded-md w-[90vw] min-h-[50vh] sm:w-[50vw] p-2 mt-8 bg-slate-100'>
            { isLoading ? (
              <Loader />
            ) : (
              <h2 className='text-xl'>Your summary will appear here.</h2>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SummaryScreen
