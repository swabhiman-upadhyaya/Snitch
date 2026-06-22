import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../state/auth.slice";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");
    const error = searchParams.get("error");

    if (error) {
      navigate("/login?error=google_auth_failed");
      return;
    }

    if (token && userParam) {
      try {
        const user = JSON.parse(userParam);
        // Store token for future API calls
        localStorage.setItem("token", token);
        // Update Redux auth state
        dispatch(setUser(user));
        navigate("/");
      } catch (err) {
        console.error("Failed to parse Google auth response:", err);
        navigate("/login?error=google_auth_failed");
      }
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--theme-1)]/15 font-sans">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-[var(--theme-3)] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-[var(--theme-4)] text-lg font-medium">Signing you in...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
