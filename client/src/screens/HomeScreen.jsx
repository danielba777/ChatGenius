import React,{ useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const HomeScreen = () => {

  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleCheckout = async (e) => {
    e.preventDefault()

    try {
      const token = await axios.get("/api/auth/refresh-token")
      if (token.data) {
        const config = { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token.data}` }}
        const sub = await axios.post("/api/auth/subscription", config)
        if (sub.subscription) {
          navigate('/summary')
        } else {
          const session = await axios.post("/api/stripe/checkout", { priceId: "price_1PTJhJELfChOnqY8pLgcoVlG", sub: "normal" }, config)
          if (session.data) {
            window.open(session.data.url, "_self")
          }
        }
      } else {
        setError("Please login to continue")
      }
    } catch (err) {
      if (err.response.data.message) {
        setError(err.response.data.message)
        setTimeout(() => { setError("") }, 3000)
      } else if (err.message) {
        setError(err.message)
        setTimeout(() => { setError("") }, 3000)
      }
    }
  } 

  return (
    <div className='flex'>
      <div className='w-[250px] h-[100vh] bg-slate-200'>
        <div className='flex justify-center items-center gap-2 text-xl mt-4'>
          <i className='fa-solid fa-screwdriver-wrench'></i>
          <h1>Tools</h1>
        </div>

        <button onClick={handleCheckout}>
          Click here to checkout!
        </button>

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