import { useState } from "react";
import { useAuth } from "../hook/useAuth"
import { useNavigate } from "react-router"

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    contact: '',
    email: '',
    password: '',
    isSeller: false
  });

  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({
      fullname: formData.fullname,
      contact: formData.contact,
      email: formData.email,
      password: formData.password,
      isSeller: formData.isSeller
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--theme-1)]/15 p-4 sm:p-6 font-sans">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl shadow-[var(--theme-2)]/20 overflow-hidden border border-[var(--theme-1)]">

        {/* Branding Panel — compact banner on mobile, full side panel on desktop */}
        <div className="side-bar w-full md:w-1/2 flex flex-col items-center justify-center py-6 px-6 md:p-12 text-white relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, var(--theme-4) 0%, var(--theme-3) 50%, var(--theme-2) 100%)` }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10"></div>
          <div className="hidden md:block absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-white/5"></div>

          <div className="relative z-10 text-center space-y-2 md:space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Snitch</h2>
            <div className="w-10 md:w-12 h-0.5 bg-white/60 mx-auto"></div>
            <p className="text-base md:text-xl font-light leading-relaxed opacity-90">Elevate Your Style</p>
            <p className="hidden md:block text-sm opacity-70 max-w-xs mx-auto leading-relaxed">
              Discover premium clothing curated for those who dare to stand out.
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 space-y-6 flex flex-col justify-center">

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-light text-[var(--theme-4)] mb-1 tracking-tight">Create Account</h1>
            <p className="text-[var(--theme-3)] text-sm font-medium">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-1">
              <label className="text-sm font-semibold tracking-wide text-[var(--theme-4)] ml-1">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--theme-2)]/50 bg-gray-50/50 text-[var(--theme-4)] placeholder-[var(--theme-3)]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--theme-3)] focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold tracking-wide text-[var(--theme-4)] ml-1">Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--theme-2)]/50 bg-gray-50/50 text-[var(--theme-4)] placeholder-[var(--theme-3)]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--theme-3)] focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold tracking-wide text-[var(--theme-4)] ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--theme-2)]/50 bg-gray-50/50 text-[var(--theme-4)] placeholder-[var(--theme-3)]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--theme-3)] focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold tracking-wide text-[var(--theme-4)] ml-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--theme-2)]/50 bg-gray-50/50 text-[var(--theme-4)] placeholder-[var(--theme-3)]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--theme-3)] focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <label className="flex items-center p-3 rounded-xl border border-[var(--theme-2)]/40 bg-[var(--theme-1)]/10 cursor-pointer group hover:bg-[var(--theme-1)]/20 transition-colors duration-300 mt-2">
              <div className="relative flex items-center justify-center">
                <input
                  id="isSeller"
                  type="checkbox"
                  name="isSeller"
                  checked={formData.isSeller}
                  onChange={handleChange}
                  className="peer appearance-none w-6 h-6 border-2 border-[var(--theme-3)] rounded-md checked:bg-[var(--theme-4)] checked:border-[var(--theme-4)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--theme-4)] transition-all cursor-pointer"
                />
                <svg
                  className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-3 text-sm font-medium text-[var(--theme-4)] select-none">
                Register as a Seller
              </span>
            </label>

            <div className="pt-1">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-[var(--theme-4)] hover:bg-[var(--theme-3)] text-white font-semibold text-lg tracking-wide rounded-xl shadow-lg shadow-[var(--theme-3)]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--theme-4)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Sign Up
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Register;