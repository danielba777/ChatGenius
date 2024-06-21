import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { handleCheckout } from '../utils/checkout'
import { checkSubscription } from '../utils/checkSubscription'

const HomeScreen = () => {
  const titles = [
    "Spark your creativity",
    "Do your best work",
    "Brainstorm ideas",
    "Deepen understanding",
    "Find your flow",
    "Learn something new",
    "Shape your plans",
    "Skip busywork",
  ];

  const navigate = useNavigate()

  const [currentTitle, setCurrentTitle] = useState(0)
  const [fade, setFade] = useState(false)
  const [slide, setSlide] = useState(false)
  const [error, setError] = useState(null)
  const [subscriptionStatus, setSubscriptionStatus] = useState('authorized')

  useEffect(() => {
    const titleChangeInterval = setInterval(() => {
      setFade(false)
      setSlide(false)
      setTimeout(() => {
        setCurrentTitle(prev => (prev + 1) % titles.length)
        setFade(true)
        setSlide(true)
      }, 500)
    }, 4000)

    setTimeout(() => {
      setFade(true)
      setSlide(true)
    }, 500);

    return () => clearInterval(titleChangeInterval)
  }, [])

  useEffect(() => {
    const fetchSubscription = async () => {
      const status = await checkSubscription()
      setSubscriptionStatus(status)
      
      if (status === 'authorized') navigate('/summary')
    };

    fetchSubscription()
  }, []);

  return (
    <div className='flex'>
      <Sidebar />
      <div className="flex-1 flex flex-col justify-center items-center bg-slate-50">
        <h1 className={`heading text-4xl font-bold text-center text-slate-700 transition-all duration-1000 transform ${fade ? 'opacity-100' : 'opacity-0'} ${slide ? 'translate-x-0' : '-translate-x-full'}`}>
          {titles[currentTitle]}
        </h1>
        <div className='flex items-center gap-2 mb-6 mt-2'>
          <h2>with</h2>
          <span className='flex items-center gap-1'>
            <i className='fa-solid fa-brain text-2xl'></i>
            <h1 className='font-semibold text-xl'>ChatGenius</h1>
          </span>
        </div>
        <div className='max-w-[500px] text-center'>
          <p>Simple to utilize. Just inquire, and our AI tools will assist you with composing, exploring, coding, and much more.</p>
        </div>
        <button onClick={(e) => handleCheckout(e, setError)} className='flex justify-center w-full text-center max-w-64 mt-4'>
          <div className='flex items-center gap-2 p-2 bg-blue-600 duration-300 hover:scale-105 text-white rounded-md w-10/12 mt-1 pl-4 shadow-md'>
            <div className='flex items-center justify-center w-6'>
              <i className='fa-solid fa-wand-magic-sparkles'></i>
            </div>
            <h2>Unleash the Genius!</h2>
          </div>
        </button>
      </div>      
    </div>
  )
}

export default HomeScreen;