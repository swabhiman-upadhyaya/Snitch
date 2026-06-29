import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../hook/useProduct'
import { useAuth } from '../../auth/hook/useAuth'
import { useTheme } from '../hook/useTheme'
import ProductCard from './../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton'
import Navbar from '../components/Navbar'

/* ─── Home Page ─────────────────────────────────────────────────── */
const Home = () => {
  const products = useSelector(state => state.product.products)
  const { handleGetAllProducts } = useProduct()
  const { handleGetMe } = useAuth()
  const theme = useTheme()
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    handleGetMe()
    handleGetAllProducts().finally(() => setLoading(false))
  }, [])

  const filtered = (products || []).filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      className="min-h-screen"
      style={{ background: theme.bgGradient, fontFamily: "'Inter',system-ui,sans-serif" }}
    >
      <Navbar />

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-3 sm:px-6 pt-[72px] sm:pt-[80px] pb-8 sm:pb-10">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.07em] mb-0.5 sm:mb-1" style={{ color: theme.t2 }}>Collection</p>
            <h1 className="text-xl sm:text-[26px] font-bold tracking-tight leading-tight" style={{ color: theme.t4 }}>
              All Products
            </h1>
            <p className="text-xs sm:text-sm mt-0.5" style={{ color: theme.t3 }}>
              {products?.length || 0} product{products?.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-[260px]">
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.t2} strokeWidth="2"
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full h-[36px] pl-8 pr-3 rounded-[9px] text-[13px] outline-none bg-white"
              style={{ border: `1px solid ${theme.borderInput}`, color: theme.t4 }}
            />
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {filtered.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : search ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center" style={{ border: `1px solid ${theme.borderLight}` }}>
            <p className="font-semibold text-[14px] sm:text-[15px] mb-1" style={{ color: theme.t4 }}>No results for "{search}"</p>
            <p className="text-[12px] sm:text-[13px]" style={{ color: theme.t2 }}>Try a different search term.</p>
          </div>
        ) : (
          <div className="bg-white rounded-[20px] py-14 sm:py-20 px-4 sm:px-6 text-center" style={{ border: `1px solid ${theme.borderLight}` }}>
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5" style={{ background: theme.t1_30 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme.t3} strokeWidth="1.6">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight mb-2" style={{ color: theme.t4 }}>No products available</h3>
            <p className="text-xs sm:text-sm max-w-xs mx-auto leading-relaxed" style={{ color: theme.t2 }}>
              Check back soon! Our sellers are adding new products every day.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home