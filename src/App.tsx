import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import Login from './pages/Login'
import Success from './pages/Success'

function App() {
  return (
    <Router 
      basename="/react-superbase-stripe"
      future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}
    >
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
