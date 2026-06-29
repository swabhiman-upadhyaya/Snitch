import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AlertModal from './AlertModal'
import { useTheme } from '../hook/useTheme'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [alertMsg, setAlertMsg] = useState(null)

  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 640) setMenuOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const handleSellerPortal = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (!user) {
      setAlertMsg('You need to be a seller to access the seller dashboard. Please login first.')
      setTimeout(() => navigate('/login'), 2500)
    } else if (user.role !== 'seller') {
      setAlertMsg('You need to be a seller to access the seller dashboard. Please register as a seller.')
    } else {
      navigate('/seller/dashboard')
    }
  }

  const handleStartSelling = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (!user) {
      setAlertMsg('You need to register as a seller to start selling products.')
      setTimeout(() => navigate('/register'), 2500)
    } else if (user.role !== 'seller') {
      setAlertMsg('You need to register as a seller to start selling any product.')
    } else {
      navigate('/seller/create-product')
    }
  }

  return (
    <>
      <AlertModal message={alertMsg} onClose={() => setAlertMsg(null)} />

      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? theme.t4_60 : theme.t4,
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? `1px solid ${theme.t1_20}` : '1px solid transparent',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex items-center justify-between h-[56px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: theme.t1 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.t4} strokeWidth="2.5">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span className="text-white font-bold text-[15px] tracking-tight" style={{ fontFamily: "'Inter',system-ui,sans-serif" }}>
              SNITCH
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden sm:flex items-center gap-5">
            <Link to="/" className="text-white/90 text-[13px] font-medium no-underline hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/login" className="text-white/90 text-[13px] font-medium no-underline hover:text-white transition-colors">
              Login
            </Link>
            <Link to="/register" className="text-white/90 text-[13px] font-medium no-underline hover:text-white transition-colors">
              Register
            </Link>
            <button
              onClick={handleSellerPortal}
              className="inline-flex items-center gap-1.5 px-4 h-[32px] rounded-[9px] text-[12px] font-semibold cursor-pointer"
              style={{
                background: theme.t1_20, color: theme.t1, border: `1px solid ${theme.t1_20}`,
                transition: 'transform 0.2s ease, box-shadow 0.25s ease, background 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 4px 12px ${theme.t4_15}` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Seller Portal
            </button>
            <button
              onClick={handleStartSelling}
              className="inline-flex items-center gap-1.5 px-4 h-[32px] rounded-[9px] text-[12px] font-semibold cursor-pointer border-none"
              style={{
                background: theme.t1, color: theme.t4,
                transition: 'transform 0.2s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 4px 12px ${theme.t4_15}` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Start Selling
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 p-0 border-none bg-transparent cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-[18px] h-[2px] rounded-full transition-all duration-300"
              style={{
                background: theme.t1,
                transform: menuOpen ? 'rotate(45deg) translateY(3.5px)' : 'none',
              }}
            />
            <span
              className="block w-[18px] h-[2px] rounded-full transition-all duration-300"
              style={{
                background: theme.t1,
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-[18px] h-[2px] rounded-full transition-all duration-300"
              style={{
                background: theme.t1,
                transform: menuOpen ? 'rotate(-45deg) translateY(-3.5px)' : 'none',
              }}
            />
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <div
          className="sm:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? '300px' : '0',
            opacity: menuOpen ? 1 : 0,
            background: theme.t4_95,
            backdropFilter: 'blur(14px)',
          }}
        >
          <div className="px-4 py-4 flex flex-col gap-3">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-white/90 text-[14px] font-medium no-underline py-1">Home</Link>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-white/90 text-[14px] font-medium no-underline py-1">Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="text-white/90 text-[14px] font-medium no-underline py-1">Register</Link>
            <button
              onClick={handleSellerPortal}
              className="text-left text-[13px] font-semibold py-1 bg-transparent border-none cursor-pointer"
              style={{ color: theme.t1 }}
            >
              Seller Portal
            </button>
            <button
              onClick={handleStartSelling}
              className="flex items-center justify-center h-[36px] rounded-[9px] text-[13px] font-semibold border-none cursor-pointer mt-1"
              style={{
                background: theme.t1, color: theme.t4,
                transition: 'transform 0.2s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 4px 12px ${theme.t4_15}` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              Start Selling
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar