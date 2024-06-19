import React,{ useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {

  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('authToken')))

  const navigate = useNavigate()

  useEffect(() => {
    if  (!loggedIn) {
      navigate('/login')
    }
  }, [loggedIn])

  const logoutHandler = async () => {
    try {
      await axios.post("/api/auth/logout").then(res => fullyLogout(res.data))
    } catch (err) {
      console.log(err)
    }
  }

  const fullyLogout = (data) => {
    if (data.success) {
      localStorage.removeItem('authToken')
      window.location.reload()
    }
  }

  const checkRefresh = async () => {
    try {
      const token = await axios.get("/api/auth/refresh-token")
      if (!token.data) {
        localStorage.removeItem('authToken')
        setLoggedIn(false)
        logoutHandler()
      } 
    } catch (err) {
      console.log(err)
    }
  }

  checkRefresh()

  return (
    <div className='flex justify-between bg-slate-700 text-white p-4 shadow-md'>
      <Link to="/">
        <h1 className='font-semibold text-xl'>ChatGenius</h1>
      </Link>
      { loggedIn ? (
          <Link to="/" onClick={logoutHandler}>
            <h2 className='font-semibold duration-300 hover:text-slate-300'>Logout</h2>
          </Link>
        ) : (
          <div className='flex items-center gap-4'>
            <Link to="/register">
              <h2 className='font-semibold duration-300 hover:text-slate-300'>Register</h2>
            </Link>
            <Link to="/login">
              <h2 className='font-semibold duration-300 hover:text-slate-300'>Login</h2>
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default Navbar