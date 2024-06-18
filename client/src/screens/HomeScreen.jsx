import React from 'react'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
  return (
    <div className='flex'>
      <div className='w-[250px] h-[100vh] bg-slate-200'>
        <div className='flex justify-center items-center gap-2 text-xl mt-4'>
          <i className='fa-solid fa-screwdriver-wrench'></i>
          <h1>Tools</h1>
        </div>

        <Link to="/summary" className='flex justify-center w-full text-center'>
          <div className='hover:bg-slate-300 py-2 rounded-md w-10/12 mt-2'>
            <h2>Text Summary</h2>
          </div>
        </Link>

        <Link to="/paragraph" className='flex justify-center w-full text-center'>
          <div className='hover:bg-slate-300 py-2 rounded-md w-10/12 mt-1'>
            <h2>Generate Paragraph</h2>
          </div>
        </Link>

        <Link to="/chatbot" className='flex justify-center w-full text-center'>
          <div className='hover:bg-slate-300 py-2 rounded-md w-10/12 mt-1'>
            <h2>Chat Bot</h2>
          </div>
        </Link>

        <Link to="/js-converter" className='flex justify-center w-full text-center'>
          <div className='hover:bg-slate-300 py-2 rounded-md w-10/12 mt-1'>
            <h2>JS Converter</h2>
          </div>
        </Link>

        <Link to="/scifi-img" className='flex justify-center w-full text-center'>
          <div className='hover:bg-slate-300 py-2 rounded-md w-10/12 mt-1'>
            <h2>Scifi Image Generator</h2>
          </div>
        </Link>
      </div>
      
      <div>

      </div>
    </div>
  )
}

export default HomeScreen
