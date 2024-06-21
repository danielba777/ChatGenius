import { Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import SummaryScreen from './screens/SummaryScreen'
import ParagraphScreen from './screens/ParagraphScreen'
import ChatbotScreen from './screens/ChatbotScreen'
import JsConvertScreen from './screens/JsConvertScreen'
import Navbar from './components/Navbar'
import ScifiScreen from './screens/ScifiScreen'
import PrivateRoute from './routing/PrivateRoute'
import NormalWrapper from "./routing/NormalWrapper"

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`)

function App() {

  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <Navbar />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
          <Route exact path="/summary" element={<PrivateRoute><NormalWrapper><SummaryScreen /></NormalWrapper></PrivateRoute>} />
          <Route exact path="/paragraph" element={<PrivateRoute><NormalWrapper><ParagraphScreen /></NormalWrapper></PrivateRoute>} />
          <Route exact path="/chatbot" element={<PrivateRoute><NormalWrapper><ChatbotScreen /></NormalWrapper></PrivateRoute>} />
          <Route exact path="/js-converter" element={<PrivateRoute><NormalWrapper><JsConvertScreen /></NormalWrapper></PrivateRoute>} />
          <Route exact path="/scifi-img" element={<PrivateRoute><NormalWrapper><ScifiScreen /></NormalWrapper></PrivateRoute>} />
        </Routes>
      </div>
    </Elements>
  );
}

export default App;
