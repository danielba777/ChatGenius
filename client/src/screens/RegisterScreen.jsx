import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const RegisterScreen = () => {
  
  const navigate = useNavigate()
  
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  };

  const submitHandler = async (e) => {

    e.preventDefault()
    
    try {
      await axios.post("https://chatgenius.onrender.com/api/auth/register", { username, email, password }, config);
      navigate("/login");

    } catch (err) {
      console.log(err)
      if (err.response.data.error) {
        toast.error(err.response.data.error)
      } else {
        toast.error(err.message)
      }

    }
  }

  return (
    <div className='flex justify-center items-center sm:h-[calc(100vh-150px)]'>
      <form className='flex flex-col items-center gap-4 mt-16 sm:mt-0' onSubmit={submitHandler}>
        <h2 className='text-center text-2xl font-semibold mb-2'>Create your account.</h2>
        <input className='border border-slate-400 py-3 px-4 w-[90vw] sm:w-80 rounded-md duration-300 focus:outline-none' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required placeholder='Username' />
        <input className='border border-slate-400 py-3 px-4 w-[90vw] sm:w-80 rounded-md duration-300 focus:outline-none' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email Address' />
        <input className='border border-slate-400 py-3 px-4 w-[90vw] sm:w-80 rounded-md duration-300 focus:outline-none' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Password' />
        <button className='bg-blue-600 py-3 px-4 rounded-md w-[90vw] sm:w-80 text-white duration-300 hover:bg-blue-700' type='submit'>Sign Up</button>
        <h3>You have an account already? <Link className='text-blue-600' to='/login'>Login</Link></h3>
      </form>
    </div>
  )
}

export default RegisterScreen