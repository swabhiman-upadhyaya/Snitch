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
    const user = await handleLogin({
      email: formData.email,
      password: formData.password
    });
    navigate(user?.isSeller ? "/seller/create-product" : "/");
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

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-[var(--theme-2)]/30"></div>
              <span className="flex-shrink-0 mx-4 text-[var(--theme-3)] text-sm font-medium">Or</span>
              <div className="flex-grow border-t border-[var(--theme-2)]/30"></div>
            </div>

            <a
              href="http://localhost:3000/api/auth/google"
              className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-white border border-[var(--theme-2)]/50 hover:bg-gray-50 text-[var(--theme-4)] font-semibold text-base tracking-wide rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--theme-3)] transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </a>

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
