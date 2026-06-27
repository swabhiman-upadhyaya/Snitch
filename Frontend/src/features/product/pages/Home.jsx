import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hook/useProduct'
import { Link } from 'react-router-dom'

/* ─── helpers ──────────────────────────────────────────────────── */
const getCurrencySymbol = (code) => {
  const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' }
  return symbols[code] || code
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

/* ─── Navbar ───────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(73,36,62,0.6)' : '#49243E',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(219,175,160,0.1)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 flex items-center justify-between h-[56px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: '#DBAFA0' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#49243E" strokeWidth="2.5">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <span className="text-white font-bold text-[15px] tracking-tight" style={{ fontFamily: "'Inter',system-ui,sans-serif" }}>
            SNITCH
          </span>
        </Link>

        {/* Nav links */}
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
          <Link
            to="/seller/dashboard"
            className="inline-flex items-center gap-1.5 px-4 h-[32px] rounded-[9px] text-[12px] font-semibold no-underline transition-all"
            style={{ background: 'rgba(219,175,160,0.2)', color: '#DBAFA0', border: '1px solid rgba(219,175,160,0.2)' }}
          >
            Seller Portal
          </Link>
          <Link
            to="/seller/create-product"
            className="inline-flex items-center gap-1.5 px-4 h-[32px] rounded-[9px] text-[12px] font-semibold no-underline transition-all"
            style={{ background: '#DBAFA0', color: '#49243E' }}
          >
            Start Selling
          </Link>
        </div>

        {/* Mobile */}
        <div className="sm:hidden flex items-center gap-2">
          <Link to="/login" className="text-white/80 text-[12px] font-medium no-underline">Login</Link>
          <Link
            to="/seller/create-product"
            className="px-3 h-[30px] rounded-lg flex items-center text-[11px] font-semibold no-underline"
            style={{ background: '#DBAFA0', color: '#49243E' }}
          >
            Start Selling
          </Link>
        </div>
      </div>
    </nav>
  )
}

/* ─── Product Card (matches Dashboard style) ───────────────────── */
function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      id={`product-${product._id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
      style={{
        border: `1px solid ${hovered ? '#d4a8bc' : '#f0e6ec'}`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#faf5f8]" style={{ aspectRatio: '4/3' }}>
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#DBAFA0" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {/* Price chip */}
        <div className="absolute top-2 right-2 bg-white/95 rounded-lg px-2.5 py-1 text-[12px] font-bold" style={{ color: '#49243E' }}>
          {getCurrencySymbol(product.price?.currency)}{product.price?.amount?.toLocaleString()}
        </div>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3 className="text-[13px] font-semibold mb-1 leading-snug line-clamp-1" style={{ color: '#49243E' }}>
          {product.title}
        </h3>
        <p className="text-[11px] leading-relaxed line-clamp-2 mb-2.5 opacity-80" style={{ color: '#704264' }}>
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[10px]" style={{ color: '#BB8493' }}>
            {product.images?.length || 0} img
          </span>
        </div>

        <div className="flex items-center justify-between pt-2.5 mt-2.5" style={{ borderTop: '1px solid #f5eff3' }}>
          <span className="text-[10px]" style={{ color: '#BB8493' }}>{formatDate(product.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Loading Skeleton ─────────────────────────────────────────── */
function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #f0e6ec' }}>
      <div className="bg-[#faf5f8] animate-pulse" style={{ aspectRatio: '4/3' }} />
      <div className="p-3.5 space-y-2.5">
        <div className="h-4 w-3/4 rounded-md bg-[#f0e6ec] animate-pulse" />
        <div className="h-3 w-full rounded-md bg-[#f5eff3] animate-pulse" />
        <div className="h-3 w-1/3 rounded-md bg-[#f0e6ec] animate-pulse" />
      </div>
    </div>
  )
}

/* ─── Home Page ─────────────────────────────────────────────────── */
const Home = () => {
  const products = useSelector(state => state.product.products)
  const { handleGetAllProducts } = useProduct()
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    handleGetAllProducts().finally(() => setLoading(false))
  }, [])

  const filtered = (products || []).filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg,#fdf8f6 0%,#f7eff4 100%)', fontFamily: "'Inter',system-ui,sans-serif" }}
    >
      <Navbar />

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-[80px] pb-10">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.07em] mb-1" style={{ color: '#BB8493' }}>Collection</p>
            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight leading-tight" style={{ color: '#49243E' }}>
              All Products
            </h1>
            <p className="text-sm mt-0.5" style={{ color: '#704264' }}>
              {products?.length || 0} product{products?.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-[260px]">
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BB8493" strokeWidth="2"
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full h-[36px] pl-8 pr-3 rounded-[9px] text-[13px] outline-none bg-white"
              style={{ border: '1px solid #ead8e4', color: '#49243E' }}
            />
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : search ? (
          <div className="bg-white rounded-2xl p-12 text-center" style={{ border: '1px solid #f0e6ec' }}>
            <p className="font-semibold text-[15px] mb-1" style={{ color: '#49243E' }}>No results for "{search}"</p>
            <p className="text-[13px]" style={{ color: '#BB8493' }}>Try a different search term.</p>
          </div>
        ) : (
          <div className="bg-white rounded-[20px] py-20 px-6 text-center" style={{ border: '1px solid #f0e6ec' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: '#DBAFA030' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#704264" strokeWidth="1.6">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold tracking-tight mb-2" style={{ color: '#49243E' }}>No products available</h3>
            <p className="text-sm max-w-xs mx-auto leading-relaxed" style={{ color: '#BB8493' }}>
              Check back soon! Our sellers are adding new products every day.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home