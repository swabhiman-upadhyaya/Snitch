import { useEffect } from 'react';
import { useProduct } from './../hook/useProduct';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { handleGetSellerProduct } = useProduct();
  const sellerProducts = useSelector(state => state.product.sellerProducts);

  useEffect(() => {
    handleGetSellerProduct();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const getCurrencySymbol = (code) => {
    const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };
    return symbols[code] || code;
  };

  return (
    <div className="min-h-screen bg-[var(--theme-1)]/10 p-6 sm:p-10 lg:p-16 font-sans relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--theme-2)]/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--theme-3)]/5 rounded-full blur-3xl translate-y-1/3 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-[var(--theme-1)]/30 shadow-lg shadow-[var(--theme-2)]/5">
          <div>
            <div className="inline-flex items-center justify-center px-4 py-1.5 bg-[var(--theme-2)]/20 text-[var(--theme-4)] rounded-full text-sm font-bold tracking-wide mb-4">
              Seller Portal
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--theme-4)]">
              Product Dashboard
            </h1>
            <p className="text-[var(--theme-3)] mt-3 font-medium text-lg">
              Manage and showcase your exclusive collection.
            </p>
          </div>
          
          <Link
            to="/seller/create-product"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white rounded-2xl overflow-hidden transition-all shadow-xl shadow-[var(--theme-3)]/30 hover:shadow-[var(--theme-4)]/40 hover:-translate-y-1"
            style={{ background: `linear-gradient(135deg, var(--theme-4) 0%, var(--theme-3) 100%)` }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create New Product
            </span>
          </Link>
        </div>

        {/* Products Grid */}
        {sellerProducts && sellerProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sellerProducts.map(product => (
              <div 
                key={product._id} 
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[var(--theme-1)] shadow-xl shadow-[var(--theme-2)]/10 hover:shadow-2xl hover:shadow-[var(--theme-3)]/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50">
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0].url} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--theme-3)]/30 bg-[var(--theme-1)]/10">
                      <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20">
                    <p className="text-sm font-extrabold text-[var(--theme-4)] tracking-tight">
                      {getCurrencySymbol(product.price?.currency)}{product.price?.amount?.toLocaleString()}
                    </p>
                  </div>

                  {/* Hover Overlay Content */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                     <span className="bg-[var(--theme-4)] text-white text-xs font-bold px-3 py-1.5 rounded-full">
                       View Details
                     </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col bg-white">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-bold text-[var(--theme-4)] line-clamp-1 group-hover:text-[var(--theme-3)] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-[var(--theme-3)]/80 text-sm line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-[var(--theme-1)] flex items-center justify-between text-xs font-bold text-[var(--theme-3)]/60 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {product.images?.length || 0} Images
                    </span>
                    <span className="flex items-center gap-1.5">
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatDate(product.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-4 bg-white/60 backdrop-blur-md border border-[var(--theme-2)]/30 rounded-[3rem] shadow-xl">
            <div className="w-32 h-32 bg-gradient-to-br from-[var(--theme-4)] to-[var(--theme-3)] rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[var(--theme-4)]/30">
              <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-4xl font-black text-[var(--theme-4)] mb-4">No Products Yet</h3>
            <p className="text-[var(--theme-3)] text-lg text-center max-w-md mb-10 leading-relaxed">
              Your vault is currently empty. Start building your store by adding your first product.
            </p>
            <Link
              to="/seller/create-product"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-[var(--theme-4)] border-2 border-[var(--theme-4)] font-bold rounded-2xl hover:bg-[var(--theme-4)] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Start Listing Now
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;