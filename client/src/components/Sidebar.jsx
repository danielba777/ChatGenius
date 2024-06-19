import React,{ useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { handleCheckout } from '../utils/checkout'
import { checkSubscription } from '../utils/checkSubscription'

const Sidebar = () => {

    const [error, setError] = useState(null)
    const [subscriptionStatus, setSubscriptionStatus] = useState('authorized')
  
    const location = useLocation()
    const navigate = useNavigate()

    const isActive = (path) => location.pathname === path ? 'bg-blue-500 text-white' : 'hover:bg-slate-300'

    useEffect(() => {
      const fetchSubscription = async () => {
        const status = await checkSubscription();
        setSubscriptionStatus(status);
        console.log("Subscription Status: ", status)
      };

      fetchSubscription();
    },[])

  return (
    <div className='flex flex-col justify-between w-[250px] h-[calc(100vh-64px)] bg-slate-200'>
      <div>
        <div className='flex justify-center items-center gap-2 text-xl mt-4'>
          <h1>Tools</h1>
        </div>

        <Link to="/summary" className='flex justify-center w-full'>
          <div className={`flex items-center gap-2 p-2 rounded-md w-10/12 mt-2 ${isActive('/summary')}`}>
            <div className='flex items-center justify-center w-6'>
              <i className='fa-solid fa-compress'></i>
            </div>
            <h2>Text Summary</h2>
          </div>
        </Link>

        <Link to="/paragraph" className='flex justify-center w-full'>
          <div className={`flex items-center gap-2 p-2 rounded-md w-10/12 mt-1 ${isActive('/paragraph')}`}>
            <div className='flex items-center justify-center w-6'>
              <i className='fa-solid fa-pencil'></i>
            </div>
            <h2>Generate Paragraph</h2>
          </div>
        </Link>

        <Link to="/chatbot" className='flex justify-center w-full'>
          <div className={`flex items-center gap-2 p-2 rounded-md w-10/12 mt-1 ${isActive('/chatbot')}`}>
            <div className='flex items-center justify-center w-6'>
              <i className='fa-solid fa-robot'></i>
            </div>
            <h2>Chat Bot</h2>
          </div>
        </Link>

        <Link to="/js-converter" className='flex justify-center w-full'>
          <div className={`flex items-center gap-2 p-2 rounded-md w-10/12 mt-1 ${isActive('/js-converter')}`}>
            <div className='flex items-center justify-center w-6'>
              <i className='fa-solid fa-code'></i>
            </div>
            <h2>JS Converter</h2>
          </div>
        </Link>

        <Link to="/scifi-img" className='flex justify-center w-full'>
          <div className={`flex items-center gap-2 p-2 rounded-md w-10/12 mt-1 ${isActive('/scifi-img')}`}>
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
