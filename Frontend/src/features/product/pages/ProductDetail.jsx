import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProduct } from '../hook/useProduct'
import { useTheme } from '../hook/useTheme'
import Navbar from '../components/Navbar'

/* ─── helpers ──────────────────────────────────────────────────── */
const getCurrencySymbol = (code) => {
  const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' }
  return symbols[code] || code
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

/* ─── Trust Badges ─────────────────────────────────────────────── */
function TrustBadges({ theme }) {
  const badges = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.t4} strokeWidth="1.8">
          <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 3v5a1 1 0 0 1-1 1h-1" />
          <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
      title: 'Complimentary Shipping',
      desc: 'Free on orders over ₹15,000',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.t4} strokeWidth="1.8">
          <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      ),
      title: 'Easy Returns',
      desc: 'Within 14 days of delivery',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.t4} strokeWidth="1.8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      ),
      title: 'Quality Assured',
      desc: 'Verified product authenticity',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.t4} strokeWidth="1.8">
          <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
      title: 'Secure Payment',
      desc: '256-bit SSL encryption',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
      {badges.map((b, i) => (
        <div
          key={i}
          className="bg-white rounded-xl px-3 py-3 sm:px-4 sm:py-4 text-center flex flex-col items-center gap-2"
          style={{
            border: `1px solid ${theme.borderLight}`,
            transition: 'box-shadow 0.25s ease, border-color 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 4px 14px ${theme.t4_08}`; e.currentTarget.style.borderColor = theme.borderHover }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = theme.borderLight }}
        >
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: theme.t1_30 }}>
            {b.icon}
          </div>
          <div>
            <p className="text-[11px] sm:text-[12px] font-bold leading-tight mb-0.5" style={{ color: theme.t4 }}>{b.title}</p>
            <p className="text-[9px] sm:text-[10px] leading-tight" style={{ color: theme.t2 }}>{b.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Skeleton Loader ──────────────────────────────────────────── */
function DetailSkeleton({ theme }) {
  return (
    <div className="max-w-[1100px] mx-auto px-3 sm:px-6 pt-[72px] sm:pt-[84px] pb-10">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-6 sm:mb-8">
        <div className="h-3 w-12 rounded-md animate-pulse" style={{ background: theme.skeletonDark }} />
        <div className="h-3 w-3 rounded-full animate-pulse" style={{ background: theme.skeletonLight }} />
        <div className="h-3 w-24 rounded-md animate-pulse" style={{ background: theme.skeletonDark }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Image gallery skeleton */}
        <div>
          <div className="rounded-2xl overflow-hidden animate-pulse mb-3" style={{ aspectRatio: '4/3', background: theme.imgBg }} />
          <div className="flex gap-2.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-1 rounded-xl overflow-hidden animate-pulse" style={{ aspectRatio: '1', background: theme.imgBg }} />
            ))}
          </div>
        </div>

        {/* Info skeleton */}
        <div className="flex flex-col gap-4">
          <div className="h-4 w-28 rounded-md animate-pulse" style={{ background: theme.skeletonLight }} />
          <div className="h-8 w-3/4 rounded-lg animate-pulse" style={{ background: theme.skeletonDark }} />
          <div className="h-10 w-40 rounded-lg animate-pulse" style={{ background: theme.skeletonDark }} />
          <div className="h-px w-full my-1" style={{ background: theme.divider }} />
          <div className="space-y-2.5">
            <div className="h-3 w-16 rounded-md animate-pulse" style={{ background: theme.skeletonDark }} />
            <div className="h-3.5 w-full rounded-md animate-pulse" style={{ background: theme.skeletonLight }} />
            <div className="h-3.5 w-5/6 rounded-md animate-pulse" style={{ background: theme.skeletonLight }} />
            <div className="h-3.5 w-2/3 rounded-md animate-pulse" style={{ background: theme.skeletonLight }} />
          </div>
          <div className="rounded-xl h-24 animate-pulse mt-2" style={{ background: theme.imgBg }} />
          <div className="flex gap-3 mt-2">
            <div className="flex-1 h-12 rounded-xl animate-pulse" style={{ background: theme.skeletonDark }} />
            <div className="flex-1 h-12 rounded-xl animate-pulse" style={{ background: theme.skeletonLight }} />
          </div>
        </div>
      </div>

      {/* Trust badges skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl h-24 sm:h-28 animate-pulse" style={{ background: theme.imgBg }} />
        ))}
      </div>
    </div>
  )
}

/* ─── Image Gallery ────────────────────────────────────────────── */
function ImageGallery({ images, theme }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const hasImages = images && images.length > 0

  return (
    <div className="lg:sticky lg:top-[70px] lg:self-start">
      {/* Main image */}
      <div
        className="rounded-2xl overflow-hidden mb-3 relative group"
        style={{
          aspectRatio: '4/3',
          background: theme.imgBg,
          border: `1px solid ${theme.borderLight}`,
          boxShadow: `0 2px 12px ${theme.t4_06}`,
        }}
      >
        {hasImages ? (
          <img
            key={activeIndex}
            src={images[activeIndex]?.url}
            alt={`Product image ${activeIndex + 1}`}
            className="w-full h-full object-cover"
            style={{ animation: 'fadeIn 0.25s ease' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={theme.t2} strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {/* Image counter badge */}
        {hasImages && images.length > 1 && (
          <div
            className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-[11px] font-semibold backdrop-blur-sm"
            style={{ background: 'rgba(0,0,0,0.45)', color: '#fff' }}
          >
            {activeIndex + 1} / {images.length}
          </div>
        )}

        {/* Navigation arrows */}
        {hasImages && images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex(i => (i === 0 ? images.length - 1 : i - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer opacity-0 group-hover:opacity-100"
              style={{
                background: 'rgba(255,255,255,0.92)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.t4} strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex(i => (i === images.length - 1 ? 0 : i + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer opacity-0 group-hover:opacity-100"
              style={{
                background: 'rgba(255,255,255,0.92)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.t4} strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {hasImages && images.length > 1 && (
        <div className="flex gap-2.5">
          {images.map((img, i) => (
            <button
              key={img._id || i}
              onClick={() => setActiveIndex(i)}
              className="flex-1 rounded-xl overflow-hidden border-none p-0 cursor-pointer"
              style={{
                aspectRatio: '1',
                outline: activeIndex === i ? `2.5px solid ${theme.t4}` : `2.5px solid transparent`,
                outlineOffset: '2px',
                opacity: activeIndex === i ? 1 : 0.55,
                transition: 'opacity 0.2s ease, outline-color 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.05)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = activeIndex === i ? '1' : '0.55'; e.currentTarget.style.transform = 'scale(1)' }}
            >
              <img src={img.url} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Product Detail Page ──────────────────────────────────────── */
const ProductDetail = () => {
  const { productId } = useParams()
  const { handleGetProductById } = useProduct()
  const theme = useTheme()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setLoading(true)
    handleGetProductById(productId)
      .then(data => setProduct(data))
      .finally(() => setLoading(false))
  }, [productId])

  const price = product?.price?.amount || 0
  const symbol = getCurrencySymbol(product?.price?.currency)

  return (
    <div
      className="min-h-screen"
      style={{ background: theme.bgGradient, fontFamily: "'Inter',system-ui,sans-serif" }}
    >
      {/* Inline keyframes for image fade */}
      <style>{`@keyframes fadeIn { from { opacity: 0.4; } to { opacity: 1; } }`}</style>

      <Navbar />

      {loading ? (
        <DetailSkeleton theme={theme} />
      ) : !product ? (
        /* ── Not Found ── */
        <div className="max-w-[1100px] mx-auto px-3 sm:px-6 pt-[72px] sm:pt-[84px] pb-10">
          <div className="bg-white rounded-[20px] py-20 px-6 text-center" style={{ border: `1px solid ${theme.borderLight}` }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: theme.t1_30 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={theme.t3} strokeWidth="1.6">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold tracking-tight mb-2" style={{ color: theme.t4 }}>Product not found</h3>
            <p className="text-sm max-w-xs mx-auto leading-relaxed mb-6" style={{ color: theme.t2 }}>
              This product may have been removed or doesn't exist.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-white text-[13px] font-semibold no-underline"
              style={{
                background: theme.t4,
                transition: 'transform 0.2s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 4px 12px ${theme.t4_18}` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              ← Back to shop
            </Link>
          </div>
        </div>
      ) : (
        /* ── Product Content ── */
        <div className="max-w-[1100px] mx-auto px-3 sm:px-6 pt-[72px] sm:pt-[84px] pb-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 mb-5 sm:mb-7 text-[12px] flex-wrap">
            <Link to="/" className="no-underline font-medium" style={{ color: theme.t2, transition: 'color 0.15s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = theme.t4}
              onMouseLeave={e => e.currentTarget.style.color = theme.t2}
            >
              Home
            </Link>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={theme.t2} strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            <span className="font-semibold truncate max-w-[200px] sm:max-w-none" style={{ color: theme.t4 }}>
              {product.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">

            {/* ── Left: Image Gallery ── */}
            <ImageGallery images={product.images} theme={theme} />

            {/* ── Right: Product Info ── */}
            <div className="flex flex-col">

              {/* Date badge */}
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.06em] mb-2.5" style={{ color: theme.t2 }}>
                Listed {formatDate(product.createdAt)}
              </span>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight leading-snug mb-3" style={{ color: theme.t4 }}>
                {product.title}
              </h1>

              {/* Price + Tax badge */}
              <div className="flex items-baseline gap-2.5 mb-4 flex-wrap">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: theme.t4 }}>
                  {symbol}{price.toLocaleString()}
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md" style={{ background: theme.t1_30, color: theme.t3 }}>
                  Inclusive of all taxes
                </span>
              </div>

              {/* Shipping note */}
              {price >= 15000 && (
                <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg" style={{ background: theme.t1_20, border: `1px solid ${theme.t1_30}` }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.t4} strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-[11px] sm:text-[12px] font-semibold" style={{ color: theme.t4 }}>
                    Eligible for complimentary shipping
                  </span>
                </div>
              )}

              {/* Divider */}
              <div className="w-full h-px mb-4" style={{ background: theme.divider }} />

              {/* Description */}
              <div className="mb-5">
                <h3 className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.06em] mb-2" style={{ color: theme.t3 }}>
                  Description
                </h3>
                <p className="text-[13px] sm:text-[14px] leading-[1.7]" style={{ color: theme.t3 }}>
                  {product.description}
                </p>
              </div>


              {/* Quantity selector */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.05em]" style={{ color: theme.t3 }}>Qty</span>
                <div className="flex items-center rounded-lg overflow-hidden" style={{ border: `1px solid ${theme.borderLight}` }}>
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center border-none bg-white cursor-pointer text-base font-medium"
                    style={{
                      color: theme.t4,
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = theme.cardHoverBg}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                  >
                    −
                  </button>
                  <span
                    className="w-11 h-9 flex items-center justify-center text-[13px] font-bold"
                    style={{ color: theme.t4, borderLeft: `1px solid ${theme.borderLight}`, borderRight: `1px solid ${theme.borderLight}` }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-9 h-9 flex items-center justify-center border-none bg-white cursor-pointer text-base font-medium"
                    style={{
                      color: theme.t4,
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = theme.cardHoverBg}
                    onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                  >
                    +
                  </button>
                </div>
                {quantity > 1 && (
                  <span className="text-[11px] font-medium" style={{ color: theme.t2 }}>
                    Total: {symbol}{(price * quantity).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Spacer for desktop */}
              <div className="flex-1 hidden lg:block min-h-2" />

              {/* Action Buttons */}
              <div className="flex gap-3 mb-2">
                <button
                  className="flex-1 h-[48px] sm:h-[52px] rounded-xl text-[13px] sm:text-[14px] font-bold cursor-pointer flex items-center justify-center gap-2"
                  style={{
                    background: 'transparent',
                    color: theme.t4,
                    border: `2px solid ${theme.t4}`,
                    transition: 'transform 0.2s ease, box-shadow 0.25s ease, background 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = `0 6px 20px ${theme.t4_15}`
                    e.currentTarget.style.background = theme.t4
                    e.currentTarget.style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = theme.t4
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  Add to Cart
                </button>
                <button
                  className="flex-1 h-[48px] sm:h-[52px] rounded-xl text-[13px] sm:text-[14px] font-bold text-white border-none cursor-pointer flex items-center justify-center gap-2"
                  style={{
                    background: theme.t4,
                    transition: 'transform 0.2s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = `0 6px 20px ${theme.t4_18}`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* ── Trust Badges Section ── */}
          <div className="mt-8 sm:mt-12">
            <TrustBadges theme={theme} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail