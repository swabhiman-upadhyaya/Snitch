import { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({
      email: formData.email,
      password: formData.password
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--theme-1)]/15 p-4 sm:p-6 font-sans">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl shadow-[var(--theme-2)]/20 overflow-hidden border border-[var(--theme-1)]">

        {/* Branding Panel */}
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
            <p className="text-base md:text-xl font-light leading-relaxed opacity-90">Welcome Back</p>
            <p className="hidden md:block text-sm opacity-70 max-w-xs mx-auto leading-relaxed">
              Log in to discover premium clothing curated for those who dare to stand out.
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 space-y-6 flex flex-col justify-center">

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-light text-[var(--theme-4)] mb-1 tracking-tight">Login</h1>
            <p className="text-[var(--theme-3)] text-sm font-medium">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

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

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-[var(--theme-4)] hover:bg-[var(--theme-3)] text-white font-semibold text-lg tracking-wide rounded-xl shadow-lg shadow-[var(--theme-3)]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--theme-4)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Log In
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-[var(--theme-3)]">
                Don't have an account?{" "}
                <Link to="/register" className="text-[var(--theme-4)] font-semibold hover:underline">
                  Sign up
                </Link>
              </p>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Login;
