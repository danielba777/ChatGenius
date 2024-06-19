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
      } else {
        const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token.data}` } }
        await axios.get("/api/auth/subscription", config).then(res => checkSub(res.data))
        setLoggedIn(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const checkSub = (data) => {
    if (data.subscription) {
      localStorage.setItem("sub", JSON.stringify(data.subscription))
    } else {
      localStorage.removeItem("sub")
    }
  }

  const createPortal = async () => {
    try {
      const token = await axios.get("/api/auth/refresh-token")

      if (token.data) {
        const config = { headers: {"Content-Type": "application/json", Authorization: `Bearer ${token.data}`}}
        const customerId = await axios.get("/api/auth/customer", config)

        if (customerId.data.customerId) {
          const portal = await axios.post("/api/stripe/portal", { customerId: customerId.data.customerId }, config)

          if (portal.data.url) {
            window.open(portal.data.url, "_self")
          }
        }
      }

    } catch (err) {
      console.log(err)
    }
  }

  checkRefresh()

  return (
    <div className='flex justify-between bg-slate-700 text-white p-4 shadow-md'>
      <Link to="/">
        <div className='flex items-center gap-1'>
          <i className='fa-solid fa-brain text-2xl'></i>
          <h1 className='font-semibold text-xl'>ChatGenius</h1>
        </div>
      </Link>
      { loggedIn ? (
          <div className='flex items-center gap-6 text-xl'>
            <button onClick={createPortal}>
              <i className='fa-solid fa-user hover:text-slate-300' />
            </button>
            <button onClick={logoutHandler}>
              <i className='fa-solid fa-right-to-bracket hover:text-slate-300' />
            </button>
          </div>
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