import { useState, useRef } from "react";
import { useProduct } from "./../hook/useProduct";
import { useNavigate, Link } from "react-router-dom";

const CURRENCY_OPTIONS = [
  { code: "INR", symbol: "₹", label: "INR (₹)" },
  { code: "USD", symbol: "$", label: "USD ($)" },
  { code: "EUR", symbol: "€", label: "EUR (€)" },
  { code: "GBP", symbol: "£", label: "GBP (£)" },
];

const MAX_IMAGES = 7;

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "INR",
  });
  const [images, setImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const processFiles = (files) => {
    const remaining = MAX_IMAGES - images.length;
    const validFiles = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, remaining);

    const newImages = validFiles.map((file) => ({
      file,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleFileSelect = (e) => {
    processFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const removeImage = (id) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("priceAmount", formData.priceAmount);
      payload.append("priceCurrency", formData.priceCurrency);
      images.forEach((img) => payload.append("images", img.file));
      await handleCreateProduct(payload);
      navigate("/");
    } catch (err) {
      console.error("Failed to create product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCurrency = CURRENCY_OPTIONS.find(
    (c) => c.code === formData.priceCurrency
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--theme-1)]/15 p-4 sm:p-6 font-sans overflow-x-hidden">
      <div className="w-full max-w-3xl min-[900px]:max-w-6xl xl:max-w-7xl min-[900px]:min-h-[85vh] flex flex-col min-[900px]:flex-row bg-white rounded-3xl shadow-2xl shadow-[var(--theme-2)]/20 overflow-hidden border border-[var(--theme-1)] transition-all duration-300">

        {/* Branding Panel */}
        <div className="hidden min-[900px]:flex w-full min-[900px]:w-2/5 flex-col items-center justify-center py-8 px-6 min-[900px]:p-12 text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, var(--theme-4) 0%, var(--theme-3) 50%, var(--theme-2) 100%)` }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10"></div>
          <div className="hidden min-[900px]:block absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-white/5"></div>

          <div className="relative z-10 text-center space-y-4 min-[900px]:space-y-8">
            <h2 className="text-3xl min-[900px]:text-6xl font-bold tracking-tight">Snitch</h2>
            <div className="w-10 min-[900px]:w-14 h-0.5 bg-white/60 mx-auto"></div>
            <p className="text-xl min-[900px]:text-3xl font-light leading-relaxed opacity-90">Create Product</p>
            <p className="hidden min-[900px]:block text-base opacity-80 max-w-xs mx-auto leading-relaxed mt-4">
              Fill in the details to list a new product and showcase it to the world.
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="w-full min-[900px]:w-3/5 p-6 sm:p-8 min-[900px]:p-12 xl:p-16 flex flex-col justify-center">

          {/* Mobile Header */}
          <div className="text-center mb-6 min-[900px]:hidden">
            <h1 className="text-3xl font-light text-[var(--theme-4)] tracking-tight">
              Create Product
            </h1>
            <p className="text-[var(--theme-3)] text-sm font-medium mt-1">
              Fill in the details to list a new product
            </p>
          </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 justify-center">
          <div className="space-y-4 min-[900px]:space-y-8">
            
            {/* Row 1: Title and Price */}
            <div className="flex flex-col sm:flex-row gap-4">
              
              {/* Title */}
              <div className="flex-[2] space-y-1">
                <label className="text-sm font-semibold tracking-wide text-[var(--theme-4)] ml-1">
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Classic Linen Shirt"
                  className="w-full px-4 py-2 rounded-xl border border-[var(--theme-2)]/50 bg-gray-50/50 text-[var(--theme-4)] placeholder-[var(--theme-3)]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--theme-3)] focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              {/* Price */}
              <div className="flex-1 space-y-1">
                <label className="text-sm font-semibold tracking-wide text-[var(--theme-4)] ml-1">
                  Price
                </label>
                <div className="flex gap-2">
                  <div className="relative w-28 shrink-0">
                    <select
                      name="priceCurrency"
                      value={formData.priceCurrency}
                      onChange={handleChange}
                      className="w-full appearance-none px-3 py-2 rounded-xl border border-[var(--theme-2)]/50 bg-gray-50/50 text-[var(--theme-4)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--theme-3)] focus:border-transparent transition-all duration-300 pr-6 font-medium cursor-pointer text-sm"
                    >
                      {CURRENCY_OPTIONS.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--theme-3)] pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--theme-3)] font-semibold text-sm">
                      {selectedCurrency?.symbol}
                    </span>
                    <input
                      type="number"
                      name="priceAmount"
                      value={formData.priceAmount}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-7 pr-3 py-2 rounded-xl border border-[var(--theme-2)]/50 bg-gray-50/50 text-[var(--theme-4)] placeholder-[var(--theme-3)]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--theme-3)] focus:border-transparent transition-all duration-300 text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Description */}
            <div className="space-y-1">
              <label className="text-sm font-semibold tracking-wide text-[var(--theme-4)] ml-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the fabric, fit, style, and what makes this product special..."
                rows={2}
                className="w-full px-4 py-2 rounded-xl border border-[var(--theme-2)]/50 bg-gray-50/50 text-[var(--theme-4)] placeholder-[var(--theme-3)]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--theme-3)] focus:border-transparent transition-all duration-300 resize-none"
                required
              />
            </div>

            {/* Row 3: Image upload */}
            <div className="space-y-1">
              <label className="text-sm font-semibold tracking-wide text-[var(--theme-4)] ml-1">
                Product Images{" "}
                <span className="font-normal text-[var(--theme-3)]/70">
                  ({images.length}/{MAX_IMAGES})
                </span>
              </label>

              {/* Drop zone — grows to fill remaining space */}
              {images.length < MAX_IMAGES && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 group flex-1 min-h-[100px]
                    ${dragOver
                      ? "border-[var(--theme-4)] bg-[var(--theme-1)]/20 scale-[1.01]"
                      : "border-[var(--theme-2)]/50 bg-gray-50/50 hover:border-[var(--theme-3)] hover:bg-[var(--theme-1)]/10"
                    }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${dragOver
                        ? "bg-[var(--theme-4)] text-white scale-110"
                        : "bg-[var(--theme-1)]/30 text-[var(--theme-3)] group-hover:bg-[var(--theme-1)]/50"
                      }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21zm14.25-13.5a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-[var(--theme-3)] font-medium text-center">
                    {dragOver ? (
                      "Drop images here"
                    ) : (
                      <>
                        <span className="text-[var(--theme-4)] font-semibold">Click to upload</span>{" "}
                        or drag & drop
                      </>
                    )}
                  </p>
                  <p className="text-xs text-[var(--theme-3)]/60">
                    PNG, JPG, WEBP — up to {MAX_IMAGES - images.length} more
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              )}

              {/* Image previews — horizontal scrollable row */}
              {images.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {images.map((img, idx) => (
                    <div
                      key={img.id}
                      className="relative w-16 h-16 lg:w-18 lg:h-18 rounded-lg overflow-hidden border border-[var(--theme-2)]/40 group/img shadow-sm hover:shadow-md transition-shadow duration-300 shrink-0"
                    >
                      <img
                        src={img.preview}
                        alt={`Product ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="opacity-0 group-hover/img:opacity-100 w-6 h-6 rounded-full bg-white/90 text-red-500 flex items-center justify-center shadow-lg transition-all duration-200 hover:bg-red-500 hover:text-white hover:scale-110 cursor-pointer"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      {idx === 0 && (
                        <span className="absolute top-0.5 left-0.5 text-[8px] font-bold bg-[var(--theme-4)] text-white px-1.5 py-0.5 rounded-full shadow leading-none">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ─── Bottom bar: submit + link ─── */}
          <div className="mt-4 space-y-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-8 bg-[var(--theme-4)] hover:bg-[var(--theme-3)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-lg tracking-wide rounded-xl shadow-lg shadow-[var(--theme-3)]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--theme-4)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Publishing...
                </>
              ) : (
                "Publish Product"
              )}
            </button>
            <p className="text-sm text-[var(--theme-3)] text-center">
              Want to manage your listings?{" "}
              <Link to="/" className="text-[var(--theme-4)] font-semibold hover:underline">
                Go to Dashboard
              </Link>
            </p>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;