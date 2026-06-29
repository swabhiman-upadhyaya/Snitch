import { useEffect, useState } from 'react';
import { useProduct } from './../hook/useProduct';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTheme } from '../hook/useTheme';

/* ─── tiny hook: current window width ─────────────────────────── */
function useWindowWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return w;
}

const getCurrencySymbol = (code) => {
  const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };
  return symbols[code] || code;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
};

/* ─── Dashboard ────────────────────────────────────────────────── */
const Dashboard = () => {
  const { handleGetSellerProduct, handleDeleteProduct } = useProduct();
  const sellerProducts = useSelector(state => state.product.sellerProducts);
  const theme = useTheme();

  const [search, setSearch]           = useState('');
  const [sort, setSort]               = useState('newest');
  const [viewMode, setViewMode]       = useState('grid');
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting]       = useState(false);

  const width = useWindowWidth();
  const isMobile = width < 640;

  useEffect(() => {
    handleGetSellerProduct();
  }, []);

  const totalValue = sellerProducts?.reduce(
    (acc, p) => acc + (p.price?.amount || 0) * (p.stock || 0), 0
  ) || 0;
  const outOfStock = sellerProducts?.filter(p => p.stock === 0).length || 0;

  const filtered = (sellerProducts || [])
    .filter(p =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'newest')     return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === 'oldest')     return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === 'price-asc')  return (a.price?.amount || 0) - (b.price?.amount || 0);
      if (sort === 'price-desc') return (b.price?.amount || 0) - (a.price?.amount || 0);
      return 0;
    });

  const confirmDelete = async () => {
    if (!deleteModal) return;
    setDeleting(true);
    await handleDeleteProduct(deleteModal._id);
    setDeleting(false);
    setDeleteModal(null);
  };

  const stats = sellerProducts && sellerProducts.length > 0 ? [
    {
      label: 'Total listings',
      value: sellerProducts.length,
      accent: false,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      label: 'Inventory value',
      value: `${getCurrencySymbol(sellerProducts[0]?.price?.currency)}${totalValue.toLocaleString()}`,
      accent: false,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      label: 'Out of stock',
      value: outOfStock,
      accent: outOfStock > 0,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
  ] : [];

  return (
    <div className="min-h-screen font-sans" style={{ background: theme.bgGradient, fontFamily: "'Inter',system-ui,sans-serif" }}>

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-4 sm:px-8 h-[52px]" style={{ background: theme.t4 }}>
        <div className="flex items-center gap-2.5">
          <div className="w-[26px] h-[26px] rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: theme.t1 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.t4} strokeWidth="2.5">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">Seller Portal</span>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: theme.t2 }}>
          S
        </div>
      </nav>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* ── Page header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.07em] mb-1" style={{ color: theme.t2 }}>Dashboard</p>
            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight leading-tight" style={{ color: theme.t4 }}>
              Your Products
            </h1>
            <p className="text-sm mt-0.5" style={{ color: theme.t3 }}>
              {sellerProducts?.length || 0} listing{sellerProducts?.length !== 1 ? 's' : ''} in your store
            </p>
          </div>
          <Link
            to="/seller/create-product"
            className="inline-flex items-center gap-1.5 px-4 h-[38px] rounded-[10px] text-white text-[13px] font-semibold no-underline flex-shrink-0 self-start sm:self-auto"
            style={{
              background: theme.t4,
              transition: 'transform 0.2s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 4px 12px ${theme.t4_18}` }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add product
          </Link>
        </div>

        {/* ── Stats ── */}
        {stats.length > 0 && (
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 sm:gap-3 bg-white rounded-2xl px-3 py-3 sm:px-4 sm:py-3.5"
                style={{
                  border: `1px solid ${stat.accent ? '#fad4d4' : theme.borderLight}`,
                  transition: 'box-shadow 0.25s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 14px ${theme.t4_08}`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-[9px] flex items-center justify-center flex-shrink-0"
                  style={{
                    background: stat.accent ? '#fdf0f0' : theme.t1_30,
                    color: stat.accent ? '#c0392b' : theme.t3,
                  }}
                >
                  {stat.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.05em] mb-0.5 truncate" style={{ color: theme.t3 }}>
                    {isMobile
                      ? stat.label.split(' ')[0]   /* shorten on mobile */
                      : stat.label}
                  </p>
                  <p
                    className="text-base sm:text-[19px] font-bold tracking-tight leading-none"
                    style={{ color: stat.accent ? '#c0392b' : theme.t4 }}
                  >
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Toolbar ── */}
        {sellerProducts && sellerProducts.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
            {/* Search */}
            <div className="relative flex-1">
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

            <div className="flex items-center gap-2">
              {/* Sort */}
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="h-[36px] px-2.5 rounded-[9px] text-[13px] bg-white outline-none cursor-pointer flex-1 sm:flex-none"
                style={{ border: `1px solid ${theme.borderInput}`, color: theme.t4 }}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
              </select>

              {/* View toggle */}
              <div className="flex rounded-[9px] overflow-hidden bg-white flex-shrink-0" style={{ border: `1px solid ${theme.borderInput}` }}>
                {[
                  {
                    key: 'grid',
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
                  },
                  {
                    key: 'list',
                    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
                  },
                ].map(v => (
                  <button
                    key={v.key}
                    onClick={() => setViewMode(v.key)}
                    className="w-9 h-[36px] flex items-center justify-center"
                    style={{
                      background: viewMode === v.key ? theme.t1_30 : 'transparent',
                      color: viewMode === v.key ? theme.t4 : theme.t2,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease, color 0.2s ease',
                    }}
                  >
                    {v.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Product area ── */}
        {sellerProducts && sellerProducts.length > 0 ? (
          filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center" style={{ border: `1px solid ${theme.borderLight}` }}>
              <p className="font-semibold text-[15px] mb-1" style={{ color: theme.t4 }}>No products found</p>
              <p className="text-[13px]" style={{ color: theme.t2 }}>Try a different search term.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map(product => (
                <DashProductCard key={product._id} product={product} onDelete={() => setDeleteModal(product)} theme={theme} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {filtered.map(product => (
                <ProductRow key={product._id} product={product} onDelete={() => setDeleteModal(product)} isMobile={isMobile} theme={theme} />
              ))}
            </div>
          )
        ) : (
          /* ── Empty state ── */
          <div className="bg-white rounded-[20px] py-20 px-6 text-center" style={{ border: `1px solid ${theme.borderLight}` }}>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: theme.t1_30 }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={theme.t3} strokeWidth="1.6">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold tracking-tight mb-2" style={{ color: theme.t4 }}>No products yet</h3>
            <p className="text-sm mb-6 max-w-xs mx-auto leading-relaxed" style={{ color: theme.t2 }}>
              Your store is empty. Add your first product to get started.
            </p>
            <Link
              to="/seller/create-product"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-white text-[13px] font-semibold no-underline"
              style={{
                background: theme.t4,
                transition: 'transform 0.2s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 4px 12px ${theme.t4_18}` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add your first product
            </Link>
          </div>
        )}
      </div>

      {/* ── Delete modal ── */}
      {deleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: theme.t4_35 }}
          onClick={() => !deleting && setDeleteModal(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm text-center"
            style={{ boxShadow: `0 8px 40px ${theme.t4_18}` }}
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-[14px] flex items-center justify-center mx-auto mb-4" style={{ background: '#fdf0f0' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="1.8">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6M9 6V4h6v2" />
              </svg>
            </div>
            <h3 className="text-base font-bold tracking-tight mb-1.5" style={{ color: theme.t4 }}>Delete product?</h3>
            <p className="text-[13px] leading-relaxed mb-5" style={{ color: theme.t2 }}>
              <span className="font-semibold" style={{ color: theme.t3 }}>{deleteModal.title}</span> will be permanently removed from your store.
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setDeleteModal(null)}
                disabled={deleting}
                className="flex-1 h-[38px] rounded-[10px] text-[13px] font-semibold bg-white cursor-pointer"
                style={{
                  border: `1px solid ${theme.borderInput}`,
                  color: theme.t3,
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = theme.cardHoverBg; e.currentTarget.style.borderColor = theme.borderHover }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = theme.borderInput }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 h-[38px] rounded-[10px] text-[13px] font-semibold text-white border-none"
                style={{
                  background: deleting ? '#e8b4b4' : '#c0392b',
                  cursor: deleting ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.25s ease',
                }}
                onMouseEnter={e => { if (!deleting) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(192,57,43,0.25)' } }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Dashboard Product Card ──────────────────────────────────── */
function DashProductCard({ product, onDelete, theme }) {
  const [hovered, setHovered] = useState(false);
  const outOfStock = product.stock === 0;

  return (
    <div
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
        <div className="absolute top-2 right-2 bg-white/95 rounded-lg px-2.5 py-1 text-[12px] font-bold" style={{ color: theme.t4 }}>
          {getCurrencySymbol(product.price?.currency)}{product.price?.amount?.toLocaleString()}
        </div>

        {outOfStock && (
          <div className="absolute bottom-0 left-0 right-0 text-white text-[10px] font-semibold text-center py-1.5 uppercase tracking-wider" style={{ background: theme.t4_60 }}>
            Out of stock
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3 className="text-[13px] font-semibold mb-1 leading-snug line-clamp-1" style={{ color: theme.t4 }}>
          {product.title}
        </h3>
        <p className="text-[11px] leading-relaxed line-clamp-2 mb-2.5 opacity-80" style={{ color: theme.t3 }}>
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-0">
          {product.category
            ? <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md" style={{ background: theme.t1_30, color: theme.t4 }}>{product.category}</span>
            : <span />}
          <span className="text-[10px]" style={{ color: theme.t2 }}>
            {product.images?.length || 0} img
          </span>
        </div>

        <div className="flex items-center justify-between pt-2.5 mt-2.5" style={{ borderTop: `1px solid ${theme.divider}` }}>
          <span className="text-[10px]" style={{ color: theme.t2 }}>{formatDate(product.createdAt)}</span>
          <div className="flex gap-1.5">
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
              <ActionBtn icon="view" theme={theme} />
            </Link>
            <ActionBtn icon="trash" danger onClick={onDelete} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Product Row ──────────────────────────────────────────────── */
function ProductRow({ product, onDelete, isMobile, theme }) {
  const outOfStock = product.stock === 0;

  return (
    <div
      className="bg-white rounded-2xl flex items-center gap-3 px-3 py-3 sm:px-4 cursor-pointer"
      style={{
        border: `1px solid ${theme.borderLight}`,
        transition: 'border-color 0.2s ease, box-shadow 0.3s ease 0.05s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = theme.borderHover; e.currentTarget.style.boxShadow = `0 4px 14px ${theme.t4_08}` }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = theme.borderLight; e.currentTarget.style.boxShadow = 'none' }}
    >
      {/* Thumb */}
      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ background: theme.imgBg }}>
        {product.images?.[0] ? (
          <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={theme.t1} strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" /><polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold truncate mb-0.5" style={{ color: theme.t4 }}>{product.title}</p>
        <p className="text-[11px] truncate" style={{ color: theme.t2 }}>{product.description}</p>
      </div>

      {/* Category — hidden on mobile */}
      {!isMobile && product.category && (
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md flex-shrink-0" style={{ background: theme.t1_30, color: theme.t4 }}>
          {product.category}
        </span>
      )}

      {/* Price */}
      <span className="text-[13px] font-bold flex-shrink-0" style={{ color: theme.t4 }}>
        {getCurrencySymbol(product.price?.currency)}{product.price?.amount?.toLocaleString()}
      </span>

      {/* Stock — hidden on mobile */}
      {!isMobile && (
        <span
          className="text-[11px] font-medium px-2.5 py-1 rounded-md flex-shrink-0"
          style={{
            color: outOfStock ? '#c0392b' : theme.t3,
            background: outOfStock ? '#fdf0f0' : theme.t1_20,
          }}
        >
          {outOfStock ? 'Out of stock' : `${product.stock} left`}
        </span>
      )}

      {/* Date — hidden on mobile */}
      {!isMobile && (
        <span className="text-[11px] flex-shrink-0" style={{ color: theme.t2 }}>
          {formatDate(product.createdAt)}
        </span>
      )}

      {/* Actions */}
      <div className="flex gap-1.5 flex-shrink-0">
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <ActionBtn icon="view" theme={theme} />
        </Link>
        <ActionBtn icon="trash" danger onClick={onDelete} theme={theme} />
      </div>
    </div>
  );
}

/* ─── Action Button ────────────────────────────────────────────── */
function ActionBtn({ icon, danger, onClick, theme }) {
  const [hov, setHov] = useState(false);
  const color = danger ? '#c0392b' : theme.t3;

  const icons = {
    view: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={hov ? color : theme.t2} strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    trash: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={hov ? color : theme.t2} strokeWidth="2">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6M9 6V4h6v2" />
      </svg>
    ),
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="w-7 h-7 rounded-[7px] flex items-center justify-center p-0"
      style={{
        border: `1px solid ${hov ? color + '40' : theme.borderInput}`,
        background: hov ? color + '0f' : 'transparent',
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.15s ease',
        transform: hov ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      {icons[icon]}
    </button>
  );
}

export default Dashboard;