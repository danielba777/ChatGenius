import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const handleCheckout = async (e, navigate, setError) => {
    
    e.preventDefault()
    if(localStorage.getItem("authToken")){
      try {
        const token = await axios.get("/api/auth/refresh-token")
        if (token.data) {
          const config = { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token.data}` }}
          const sub = await axios.get("/api/auth/subscription", config)
          
          if (sub.subscription) {
            navigate("/summary")
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
    } else {
      setError("Please login to continue")
      setTimeout(() => { setError("")}, 3000)
    }
} 