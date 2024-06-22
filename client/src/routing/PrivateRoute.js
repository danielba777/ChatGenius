import { Navigate } from "react-router-dom"
import { toast } from 'react-toastify'

const PrivateRoute = ({ children }) => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) toast.error("You need to login in first")
    return authToken ? children : <Navigate to="/login" />
}

export default PrivateRoute