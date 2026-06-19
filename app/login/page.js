"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Loader } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const login = async () => {
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));

        window.dispatchEvent(new Event("storage"));

        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }

        router.refresh();
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 bg-purple-500 rounded-full w-96 h-96 mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full w-96 h-96 mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000" />
      <div className="absolute bg-pink-500 rounded-full top-1/2 left-1/2 w-96 h-96 mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-4000" />

      {/* Login Container */}
      <div className="relative w-full max-w-md">
        <div className="p-8 space-y-6 border shadow-2xl backdrop-blur-xl bg-white/10 border-white/20 rounded-2xl">
          {/* Header */}
          <div className="space-y-2 text-center animate-fade-in">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  AlphaAryX
                </h1>
                <p className="text-sm text-slate-300">Digital Services</p>
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-sm text-slate-300">Sign in to access your account and orders</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-4 py-3 text-sm text-red-300 border rounded-lg bg-red-500/20 border-red-500/50 animate-shake">
              {error}
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Email Field */}
            <div className="relative group">
              <label className="block mb-2 text-sm font-medium text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute w-5 h-5 transition-colors transform -translate-y-1/2 left-4 top-1/2 text-slate-400 group-focus-within:text-cyan-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className="w-full py-3 pl-12 pr-4 text-white transition-all border rounded-lg bg-white/5 border-white/10 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative group">
              <label className="block mb-2 text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute w-5 h-5 transition-colors transform -translate-y-1/2 left-4 top-1/2 text-slate-400 group-focus-within:text-cyan-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className="w-full py-3 pl-12 pr-4 text-white transition-all border rounded-lg bg-white/5 border-white/10 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={login}
            disabled={loading}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 font-semibold text-white transition-all transform rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-400">
                Don't have an account?
              </span>
            </div>
          </div>

          {/* Register Link */}
          <button
            onClick={() => router.push("/register")}
            className="w-full px-4 py-3 font-semibold text-white transition-all border rounded-lg border-white/20 hover:border-cyan-400/50 bg-white/5 hover:bg-white/10"
          >
            Create Account
          </button>

          {/* Footer */}
          <p className="text-xs text-center text-slate-400">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}