import React from 'react'
import Sidebar from '../components/Sidebar'

const HomeScreen = () => {

  return (
    <div className='flex'>
      <Sidebar />
      <div className='relative w-screen'>
        <img src='./bg.jpeg' alt='bg' />
        <div className='absolute'>
          
        </div>
      </div>
    </div>
  )
}

export default HomeScreen