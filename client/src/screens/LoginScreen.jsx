import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

axios.defaults.withCredentials = true;

const LoginScreen = () => {
  
  const navigate = useNavigate()
  
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const config = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  };

  const submitHandler = async (e) => {

    e.preventDefault()
    
    try {
      const { data } = await axios.post("https://chatgenius.onrender.com/api/auth/login", { email, password }, config);
      
      if(data.token.accessToken) {
        localStorage.setItem("authToken", true)
        navigate("/")
        window.location.reload()
      }

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
        <h2 className='text-center text-2xl font-semibold mb-2'>Welcome back!</h2>
        <input className='border border-slate-400 py-3 px-4 w-[90vw] sm:w-80 rounded-md duration-300 focus:outline-none' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email Address' />
        <input className='border border-slate-400 py-3 px-4 w-[90vw] sm:w-80 rounded-md duration-300 focus:outline-none' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Password' />
        <button className='bg-blue-600 py-3 px-4 rounded-md w-[90vw] sm:w-80 text-white duration-300 hover:bg-blue-700' type='submit'>Log In</button>
        <h3>Don't have an account? <Link className='text-blue-600' to='/register'>Sign Up</Link></h3>
      </form>
    </div>
  )
}

export default LoginScreen