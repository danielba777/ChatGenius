import React,{ useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { handleCheckout } from '../utils/checkout'
import { checkSubscription } from '../utils/checkSubscription'
import { toast } from 'react-toastify'

const Sidebar = () => {

    const [error, setError] = useState(null)
    const [subscriptionStatus, setSubscriptionStatus] = useState('authorized')
  
    const location = useLocation()
    const navigate = useNavigate()

    const isActive = (path) => location.pathname === path ? 'bg-blue-500 text-white' : 'hover:bg-slate-300'

    useEffect(() => {
      const fetchSubscription = async () => {
        const status = await checkSubscription()
        setSubscriptionStatus(status);
        console.log("Subscription Status: ", status)
      };

      fetchSubscription()
    },[])

    useEffect(() => {
      if (error) {
        toast.error(error)
      }
    },[error])

  return (
    <div className='flex flex-row sm:flex-col justify-between sm:w-[250px] sm:h-[calc(100vh-64px)] bg-slate-200'>
      <div className='flex flex-row gap-2 sm:gap-1 sm:flex-col overflow-x-auto p-2 sm:p-0'>
        <div className='hidden sm:flex justify-center items-center gap-2 text-xl sm:mt-4'>
          <h1 className='heading'>Tools</h1>
        </div>

        <Link to="/summary" className='flex justify-center w-full'>
          <div className={`flex justify-center sm:justify-start items-center gap-2 p-2 rounded-md min-w-[150px] w-max sm:w-10/12 sm:mt-2 ${isActive('/summary')}`}>
            <div className='flex items-center justify-center sm:w-6'>
              <i className='fa-solid fa-compress'></i>
            </div>
            <h2>Text Summarizer</h2>
          </div>
        </Link>

        <Link to="/paragraph" className='flex justify-center w-full'>
          <div className={`flex justify-center sm:justify-start items-center gap-2 p-2 rounded-md min-w-[200px] sm:w-10/12 sm:mt-2  ${isActive('/paragraph')}`}>
            <div className='flex items-center justify-center w-6'>
              <i className='fa-solid fa-pencil'></i>
            </div>
            <h2>Paragraph Generator</h2>
          </div>
        </Link>

        <Link to="/chatbot" className='flex justify-center w-full'>
          <div className={`flex justify-center sm:justify-start items-center gap-2 p-2 rounded-md min-w-[180px] sm:w-10/12 sm:mt-2 ${isActive('/chatbot')}`}>
            <div className='flex items-center justify-center w-6'>
              <i className='fa-solid fa-robot'></i>
            </div>
            <h2>Chat Bot</h2>
          </div>
        </Link>

        <Link to="/js-converter" className='flex justify-center w-full'>
          <div className={`flex justify-center sm:justify-start items-center gap-2 p-2 rounded-md min-w-[180px] sm:w-10/12 sm:mt-2 ${isActive('/js-converter')}`}>
            <div className='flex items-center justify-center w-6'>
              <i className='fa-solid fa-code'></i>
            </div>
            <h2>JS Converter</h2>
          </div>
        </Link>

        <Link to="/scifi-img" className='flex justify-center w-full'>
          <div className={`flex justify-center sm:justify-start items-center gap-2 p-2 rounded-md min-w-[180px] sm:w-10/12 sm:mt-2 ${isActive('/scifi-img')}`}>
            <div className='flex items-center justify-center w-6'>
              <i className='fa-solid fa-image'></i>
            </div>
            <h2>Image Generator</h2>
          </div>
        </Link>
      </div>
      <div className='mb-4'>
        {subscriptionStatus !== 'authorized' && (
           <button onClick={(e) => handleCheckout(e, setError)} className='flex justify-center w-full text-center'>
             <div className='flex items-center gap-2 p-2 bg-blue-600 duration-300 hover:scale-105 text-white rounded-md w-10/12 mt-1 shadow-md'>
               <div className='flex items-center justify-center w-6'>
                 <i className='fa-solid fa-wand-magic-sparkles'></i>
               </div>
               <h2>Unleash the Genius!</h2>
             </div>
           </button>
        )}
      </div>
    </div>
  )
}

export default Sidebar;
