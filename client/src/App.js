import { Routes, Route } from "react-router-dom";
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import SummaryScreen from './screens/SummaryScreen'
import ParagraphScreen from './screens/ParagraphScreen'
import ChatbotScreen from './screens/ChatbotScreen'
import JsConvertScreen from './screens/JsConvertScreen'
import Navbar from './components/Navbar'
import ScifiScreen from './screens/ScifiScreen'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`)

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
          <Route exact path="/summary" element={<SummaryScreen />} />
          <Route exact path="/paragraph" element={<ParagraphScreen />} />
          <Route exact path="/chatbot" element={<ChatbotScreen />} />
          <Route exact path="/js-converter" element={<JsConvertScreen />} />
          <Route exact path="/scifi-img" element={<ScifiScreen />} />
        </Routes>
      </div>
    </Elements>
  );
}

export default App;
