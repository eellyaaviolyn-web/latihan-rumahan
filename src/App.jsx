import { Routes, Route } from 'react-router-dom'
import { ToastProvider } from './components/Toast'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

/* Public Pages */
import Beranda from './pages/Beranda'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Harga from './pages/Harga'
import Tentang from './pages/Tentang'

/* Protected Pages */
import Program from './pages/Program'
import Detail from './pages/Detail'
import Jadwal from './pages/Jadwal'
import Komunitas from './pages/Komunitas'
import Kalkulator from './pages/Kalkulator'
import AiStudio from './pages/AiStudio'
import Profile from './pages/Profile'

function App() {
  return (
    <ToastProvider>
      <Navbar />
      <div className="page-container">
        <Routes>
          {/* ── PUBLIC ── */}
          <Route path="/"               element={<Beranda />} />
          <Route path="/login"          element={<Login />} />
          <Route path="/register"       element={<Register />} />
          <Route path="/lupa-password"  element={<ForgotPassword />} />
          <Route path="/harga"          element={<Harga />} />
          <Route path="/tentang"        element={<Tentang />} />

          {/* ── PROTECTED (login required) ── */}
          <Route path="/program"    element={<ProtectedRoute><Program /></ProtectedRoute>} />
          <Route path="/detail/:id" element={<ProtectedRoute><Detail /></ProtectedRoute>} />
          <Route path="/jadwal"     element={<ProtectedRoute><Jadwal /></ProtectedRoute>} />
          <Route path="/komunitas"  element={<ProtectedRoute><Komunitas /></ProtectedRoute>} />
          <Route path="/kalkulator" element={<ProtectedRoute><Kalkulator /></ProtectedRoute>} />
          <Route path="/ai-studio"  element={<ProtectedRoute><AiStudio /></ProtectedRoute>} />
          <Route path="/profil"     element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </div>
      <Footer />
    </ToastProvider>
  )
}

export default App
