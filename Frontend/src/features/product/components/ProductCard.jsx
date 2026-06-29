import { useState } from "react"
import { useTheme } from "../hook/useTheme"
import { useNavigate } from "react-router"

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

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const theme = useTheme()
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      id={`product-${product._id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer"
      style={{
        border: `1px solid ${hovered ? theme.borderHover : theme.borderLight}`,
        boxShadow: hovered ? `0 4px 16px ${theme.t4_08}` : `0 1px 3px ${theme.t4_03}`,
        background: hovered ? theme.cardHoverBg : '#fff',
        transition: 'border-color 0.2s ease, background 0.2s ease, box-shadow 0.3s ease 0.05s',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', background: theme.imgBg }}>
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={theme.t1} strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}

        {/* Price chip */}
        <div className="absolute top-2 right-2 bg-white/95 rounded-lg px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-[12px] font-bold" style={{ color: theme.t4 }}>
          {getCurrencySymbol(product.price?.currency)}{product.price?.amount?.toLocaleString()}
        </div>
      </div>

      {/* Info */}
      <div className="p-2.5 sm:p-3.5">
        <h3 className="text-[12px] sm:text-[13px] font-semibold mb-0.5 sm:mb-1 leading-snug line-clamp-1" style={{ color: theme.t4 }}>
          {product.title}
        </h3>
        <p className="text-[10px] sm:text-[11px] leading-relaxed line-clamp-2 mb-2 sm:mb-2.5 opacity-80" style={{ color: theme.t3 }}>
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-[9px] sm:text-[10px]" style={{ color: theme.t2 }}>
            {product.images?.length || 0} img
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 mt-2 sm:pt-2.5 sm:mt-2.5" style={{ borderTop: `1px solid ${theme.divider}` }}>
          <span className="text-[9px] sm:text-[10px]" style={{ color: theme.t2 }}>{formatDate(product.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard