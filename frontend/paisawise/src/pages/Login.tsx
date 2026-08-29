import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

function GoogleIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

/* ========================================================================= */
/* Standalone Vector Line-Art Illustration Component                         */
/* Zero Image Containers, Zero Rectangular Borders, Pure Vector Integration   */
/* ========================================================================= */
function SpendIQIllustration() {
  return (
    <div className="relative w-full max-w-xl lg:max-w-2xl mx-auto flex items-center justify-center select-none py-2">
      
      {/* Floating Light AI Insight Badge (Seamless on mint background) */}
      <div className="absolute top-0 right-2 z-10 bg-[#0f172a] text-white px-4 py-2 rounded-full shadow-md text-xs flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#34d399]" />
        <span className="text-xs font-medium">AI Insight: Spent 20% less on dining</span>
      </div>

      {/* Floating Light Spending Stat Pill (Top Left) */}
      <div className="absolute top-2 left-2 z-10 bg-white/80 backdrop-blur-sm border border-[#245c4a]/15 px-3.5 py-2 rounded-full text-xs font-semibold text-[#0f172a] shadow-xs flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-[#245c4a]" />
        <span>Monthly: ₹12,480</span>
      </div>

      {/* Vector SVG Line-Art Canvas */}
      <svg
        viewBox="0 0 500 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[460px] lg:max-h-[500px] drop-shadow-sm scale-105"
      >
        {/* Soft Background Accent Circles */}
        <circle cx="250" cy="180" r="135" fill="#245c4a" fillOpacity="0.04" />
        
        {/* Floating Rupee Symbol Badges */}
        <g transform="translate(80, 110)">
          <circle cx="14" cy="14" r="14" fill="#245c4a" fillOpacity="0.1" stroke="#245c4a" strokeWidth="1.5" />
          <text x="14" y="19" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#245c4a">₹</text>
        </g>
        <g transform="translate(390, 210)">
          <circle cx="12" cy="12" r="12" fill="#245c4a" fillOpacity="0.15" stroke="#245c4a" strokeWidth="1.5" />
          <text x="12" y="16" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#245c4a">₹</text>
        </g>

        {/* Floating Coin Doodles */}
        <circle cx="140" cy="240" r="8" fill="#245c4a" fillOpacity="0.1" stroke="#245c4a" strokeWidth="1.2" />
        <circle cx="360" cy="110" r="6" fill="#245c4a" fillOpacity="0.1" stroke="#245c4a" strokeWidth="1.2" />
        
        {/* Sparkles / Finance Doodles */}
        <path d="M110 65 L113 73 L121 76 L113 79 L110 87 L107 79 L99 76 L107 73 Z" fill="#245c4a" fillOpacity="0.3" />
        <path d="M375 80 L377 85 L382 87 L377 89 L375 94 L373 89 L368 87 L373 85 Z" fill="#245c4a" fillOpacity="0.35" />

        {/* Decorative Pie Chart Sketch */}
        <g stroke="#245c4a" strokeWidth="1.8" strokeLinecap="round" opacity="0.6">
          <circle cx="370" cy="145" r="16" fill="#eef6f2" />
          <path d="M370 129 L370 145 L386 145" />
        </g>

        {/* Decorative Mini Bar Chart Sketch */}
        <g stroke="#245c4a" strokeWidth="1.5" opacity="0.5">
          <rect x="95" y="215" width="7" height="20" rx="1.5" fill="#245c4a" fillOpacity="0.2" />
          <rect x="107" y="200" width="7" height="35" rx="1.5" fill="#245c4a" fillOpacity="0.4" />
          <rect x="119" y="210" width="7" height="25" rx="1.5" fill="#245c4a" fillOpacity="0.3" />
        </g>

        {/* ------------------------------------------------------------------------- */}
        {/* MAN CHARACTER: Holding Indian Rupee Cash                                  */}
        {/* ------------------------------------------------------------------------- */}
        <g stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          
          {/* Hair & Head */}
          <path d="M165 110 C165 95 180 90 190 95 C195 90 205 92 210 100 C215 105 215 115 210 120 C205 125 195 130 185 130 C175 130 165 120 165 110 Z" fill="#1e293b" />
          <path d="M175 115 C175 130 185 142 195 142 C202 142 208 135 208 122" fill="#f8fafc" />
          <circle cx="198" cy="118" r="1.5" fill="#0f172a" stroke="none" />
          <path d="M194 128 Q198 133 203 128" fill="none" strokeWidth="1.8" />
          <path d="M188 142 L188 152 M198 141 L198 152" strokeWidth="2" />

          {/* Shirt & Body */}
          <path d="M165 160 L150 250 M218 160 L230 250" />
          <path d="M165 160 Q192 152 218 160" fill="#eef6f2" />
          <path d="M192 160 L192 245" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.6" />

          {/* Left Arm holding Rupee Cash */}
          <path d="M160 165 Q135 150 125 125" />
          <circle cx="125" cy="120" r="4.5" fill="#f8fafc" />
          
          {/* Fan of Indian Rupee Notes */}
          <g transform="translate(100, 85) rotate(-15)" stroke="#245c4a" strokeWidth="1.8" fill="#dceee7">
            <rect x="0" y="0" width="36" height="22" rx="3" />
            <text x="18" y="15" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#245c4a" stroke="none">₹</text>
          </g>
          <g transform="translate(112, 80) rotate(10)" stroke="#245c4a" strokeWidth="1.8" fill="#eef6f2">
            <rect x="0" y="0" width="36" height="22" rx="3" />
            <text x="18" y="15" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#245c4a" stroke="none">₹</text>
          </g>

          {/* Right Arm relaxed */}
          <path d="M218 165 Q232 195 228 230" />

          {/* Legs/Pants */}
          <path d="M152 250 L158 330 M226 250 L220 330 M190 250 L190 330" strokeWidth="2.2" />
        </g>

        {/* ------------------------------------------------------------------------- */}
        {/* WOMAN CHARACTER: Holding Smartphone with Finance Interface                */}
        {/* ------------------------------------------------------------------------- */}
        <g stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          
          {/* Hair & Head */}
          <path d="M300 115 C295 90 320 80 338 85 C355 88 365 105 365 130 C365 160 355 180 350 195" fill="#1e293b" />
          <path d="M312 110 C310 125 320 138 330 138 C338 138 344 130 344 118" fill="#f8fafc" />
          <circle cx="322" cy="116" r="1.5" fill="#0f172a" stroke="none" />
          <path d="M320 126 Q325 130 330 126" fill="none" strokeWidth="1.8" />
          <circle cx="342" cy="120" r="2" fill="#245c4a" stroke="none" />

          {/* Sweater & Body */}
          <path d="M300 155 L288 245 M350 155 L360 245" />
          <path d="M300 155 Q325 148 350 155" fill="#eef6f2" />

          {/* Arms holding Smartphone */}
          <path d="M302 160 Q290 190 308 200" />
          <path d="M348 160 Q340 190 320 200" />

          {/* Smartphone device */}
          <g transform="translate(304, 180) rotate(-8)">
            <rect x="0" y="0" width="24" height="42" rx="4" fill="#0f172a" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="2" y="3" width="20" height="36" rx="2" fill="#eef6f2" stroke="none" />
            <path d="M5 28 L10 20 L15 24 L19 12" stroke="#245c4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="19" cy="12" r="1.5" fill="#245c4a" stroke="none" />
          </g>

          {/* Tablet in Hand */}
          <g transform="translate(332, 195) rotate(12)">
            <rect x="0" y="0" width="34" height="48" rx="4" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8" />
            <rect x="6" y="26" width="4" height="14" rx="1" fill="#245c4a" stroke="none" />
            <rect x="13" y="16" width="4" height="24" rx="1" fill="#245c4a" stroke="none" />
            <rect x="20" y="20" width="4" height="20" rx="1" fill="#245c4a" stroke="none" />
          </g>

          {/* Pants */}
          <path d="M290 245 L295 330 M358 245 L352 330 M324 245 L324 330" strokeWidth="2.2" />
        </g>
      </svg>
    </div>
  );
}

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const resetFormState = (signupMode: boolean) => {
    setIsSignup(signupMode);
    setErrorMessage("");
    setSuccessMessage("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Client-side validations
    if (!email.trim() || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (isSignup) {
      if (password.length < 6) {
        setErrorMessage("Password must be at least 6 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }
    }

    setLoading(true);

    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

        if (error) {
          setErrorMessage(error.message);
        } else {
          setSuccessMessage(
            "Account created! Check your email for a confirmation link, or log in directly if auto-confirmed."
          );
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setErrorMessage(error.message);
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        setErrorMessage(
          error.message || "Google OAuth is not enabled for this Supabase project. Please use email and password."
        );
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message || "Google Sign-In is not configured on this project. Please sign in with Email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#edf6f2] flex items-center justify-center p-3 sm:p-6 lg:p-8 font-sans text-[#0f172a]">
      {/* Outer Container */}
      <div className="w-full max-w-6xl bg-white rounded-3xl border border-[#dceee7] shadow-xl shadow-[#245c4a]/5 overflow-hidden flex flex-col md:flex-row min-h-[660px]">
        
        {/* ========================================================================= */}
        {/* LEFT PANEL: Clean Vector Line-Art Illustration & SpendIQ Branding        */}
        {/* ========================================================================= */}
        <div className="w-full md:w-[55%] bg-[#edf6f2] p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#245c4a]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#245c4a]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Brand Header */}
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold text-[#0f172a] tracking-tight">
              SpendIQ
            </h1>
            <p className="text-xs text-[#245c4a] font-semibold tracking-wide uppercase mt-1">
              Understand your spending. Improve your habits.
            </p>
          </div>

          {/* Main Standalone Line-Art Vector Illustration */}
          <div className="relative z-10 flex-1 flex items-center justify-center py-2 w-full">
            <SpendIQIllustration />
          </div>



        </div>

        {/* ========================================================================= */}
        {/* RIGHT PANEL: Authentication Form Card                                    */}
        {/* ========================================================================= */}
        <div className="w-full md:w-[45%] p-8 lg:p-12 flex flex-col justify-between bg-white">
          
          <div>
            {/* Top Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <span className="text-lg font-bold text-[#0f172a] md:hidden">SpendIQ</span>
              <div className="flex gap-6 ml-auto">
                <button
                  type="button"
                  onClick={() => resetFormState(false)}
                  className={`pb-2 text-sm font-semibold transition-all relative ${
                    !isSignup
                      ? "text-[#245c4a]"
                      : "text-[#64748b] hover:text-[#0f172a]"
                  }`}
                >
                  Log in
                  {!isSignup && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#245c4a] rounded-full" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => resetFormState(true)}
                  className={`pb-2 text-sm font-semibold transition-all relative ${
                    isSignup
                      ? "text-[#245c4a]"
                      : "text-[#64748b] hover:text-[#0f172a]"
                  }`}
                >
                  Sign up
                  {isSignup && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#245c4a] rounded-full" />
                  )}
                </button>
              </div>
            </div>

            {/* Form Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#0f172a]">
                {isSignup ? "Create your account" : "Welcome back"}
              </h2>
              <p className="text-xs text-[#64748b] mt-1">
                Understand your spending. Improve your habits.
              </p>
            </div>

            {/* Form Banners */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-[#0f172a] uppercase tracking-wider mb-1.5"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748b]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-[#0f172a] placeholder-gray-400 outline-none focus:bg-white focus:border-[#245c4a] focus:ring-2 focus:ring-[#245c4a]/15 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-[#0f172a] uppercase tracking-wider mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748b]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isSignup ? "Create a password" : "Enter your password"}
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-[#0f172a] placeholder-gray-400 outline-none focus:bg-white focus:border-[#245c4a] focus:ring-2 focus:ring-[#245c4a]/15 transition-all"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748b] hover:text-[#0f172a] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field (Sign up tab only) */}
              {isSignup && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-semibold text-[#0f172a] uppercase tracking-wider mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748b]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-10 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm text-[#0f172a] placeholder-gray-400 outline-none focus:bg-white focus:border-[#245c4a] focus:ring-2 focus:ring-[#245c4a]/15 transition-all"
                    />
                    <button
                      type="button"
                      aria-label={
                        showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                      }
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748b] hover:text-[#0f172a] transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Remember Me & Forgot Password (Login tab only) */}
              {!isSignup && (
                <div className="flex items-center justify-between pt-1 pb-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-[#64748b] hover:text-[#0f172a] select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-[#245c4a] focus:ring-[#245c4a] accent-[#245c4a]"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={async (e) => {
                      e.preventDefault();
                      setErrorMessage("");
                      setSuccessMessage("");

                      if (!email.trim()) {
                        setErrorMessage("Please enter your email address above to receive password reset instructions.");
                        return;
                      }

                      setLoading(true);
                      try {
                        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
                          redirectTo: `${window.location.origin}/reset-password`,
                        });

                        if (error) {
                          setErrorMessage(error.message);
                        } else {
                          setSuccessMessage(
                            `Password reset email sent to ${email.trim()}! Check your inbox.`
                          );
                        }
                      } catch (err: any) {
                        setErrorMessage(err?.message || "Failed to send reset email.");
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="text-[#245c4a] font-medium hover:underline text-xs"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-6 bg-[#245c4a] hover:bg-[#1c483a] text-white font-semibold text-sm rounded-xl shadow-md shadow-[#245c4a]/20 transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{isSignup ? "Creating account..." : "Logging in..."}</span>
                  </>
                ) : (
                  <>
                    <span>{isSignup ? "Create account" : "Log in"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="border-t border-gray-100 w-full" />
              <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-gray-400 font-medium absolute">
                OR
              </span>
            </div>

            {/* Google Sign-in Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#0f172a] shadow-sm flex items-center justify-center gap-2.5 transition-colors disabled:opacity-60"
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Bottom Switch Link */}
          <div className="mt-8 text-center border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={() => resetFormState(!isSignup)}
              className="text-xs text-[#64748b] hover:text-[#245c4a] transition-colors"
            >
              {isSignup ? (
                <span>
                  Already have an account? <strong className="text-[#245c4a] font-semibold">Log in</strong>
                </span>
              ) : (
                <span>
                  Don't have an account? <strong className="text-[#245c4a] font-semibold">Sign up</strong>
                </span>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;