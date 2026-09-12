import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Beranda from './pages/Beranda'
import Program from './pages/Program'
import Detail from './pages/Detail'
import Jadwal from './pages/Jadwal'
import Tentang from './pages/Tentang'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Harga from './pages/Harga'
import Komunitas from './pages/Komunitas'

function App() {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/program" element={<Program />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/jadwal" element={<Jadwal />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lupa-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/harga" element={<Harga />} />
          <Route path="/komunitas" element={<Komunitas />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
