import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Icon from "../../components/AppIcon";
import { SmokeBackground } from "../../components/ui/spooky-smoke-animation";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [organization, setOrganization] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        
        // Check if online
        if (!navigator.onLine) {
            setError("You appear to be offline. Please check your internet connection.");
            return;
        }
        
        try {
            setError("");
            setLoading(true);
            await signup(email, password, displayName, organization);
            // Navigate immediately after successful signup
            navigate("/dashboard-overview", { replace: true });
        } catch (err) {
            let errorMessage = "Failed to create an account. ";
            
            if (err.code === 'auth/email-already-in-use') {
                errorMessage = "This email is already registered. Please login instead or use a different email.";
            } else if (err.code === 'auth/weak-password') {
                errorMessage = "Password is too weak. Please use at least 6 characters.";
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address format.";
            } else if (err.code === 'auth/network-request-failed') {
                errorMessage = "Network error. Please check your internet connection and try again.";
            } else {
                errorMessage += err.message;
            }
            setError(errorMessage);
            setLoading(false);
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-black">
            {/* Animated Background */}
            <SmokeBackground smokeColor="#4ade80" />

            <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row rounded-[2rem] overflow-hidden" 
                 style={{ 
                     background: "rgba(10, 20, 10, 0.45)", 
                     border: "1px solid rgba(50, 205, 50, 0.15)",
                     boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.9)",
                     backdropFilter: "blur(24px)",
                     WebkitBackdropFilter: "blur(24px)"
                 }}>
                
                {/* Left Side - Welcome Section */}
                <div className="hidden lg:flex lg:flex-1 flex-col justify-between p-12 xl:p-16 relative overflow-hidden" 
                     style={{ background: "linear-gradient(135deg, rgba(45,90,61,0.3) 0%, rgba(10,20,10,0.7) 100%)" }}>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
                    <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[80px] pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-16">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg backdrop-blur-md relative overflow-hidden">
                                <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></span>
                                <Icon name="Leaf" size={26} color="#32CD32" />
                            </div>
                            <span className="text-2xl font-heading font-bold text-white tracking-wide">Greenergy</span>
                        </div>
                        
                        <h1 className="text-5xl xl:text-6xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-xl" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)"}}>
                            Join the<br /><span style={{ color: "#4ade80" }}>Green Movement</span>
                        </h1>
                        <p className="text-lg" style={{ color: "rgba(255,255,255,0.7)", maxWidth: "400px", lineHeight: "1.7" }}>
                            Create your account and start making data-driven environmental decisions today.
                        </p>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-5 group hover:bg-black/40 xl:p-6 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                            <div className="flex items-start gap-4 relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1 shadow-inner border border-primary/30">
                                    <Icon name="BarChart3" size={20} color="#4ade80" />
                                </div>
                                <div>
                                    <p className="text-white font-heading font-medium mb-1 xl:text-lg">Real-time Analytics</p>
                                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                                        Access live environmental data and insights.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-5 group hover:bg-black/40 xl:p-6 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                            <div className="flex items-start gap-4 relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1 shadow-inner border border-primary/30">
                                    <Icon name="MapPin" size={20} color="#4ade80" />
                                </div>
                                <div>
                                    <p className="text-white font-heading font-medium mb-1 xl:text-lg">District-wise Data</p>
                                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                                        Monitor all your registered districts at once.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Signup Form */}
                <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16" style={{ background: "rgba(0,0,0,0.55)" }}>
                    <div className="w-full max-w-md">
                        <div className="text-center lg:text-left mb-8">
                            <h2 className="text-3xl font-heading font-bold text-white mb-3 tracking-tight">Create Account</h2>
                            <p className="font-caption" style={{ color: "rgba(255,255,255,0.6)" }}>Join Greenergy environmental platform.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-900/30 border border-red-500/30 text-red-200 text-sm flex items-start gap-3 backdrop-blur-sm shadow-lg">
                                <Icon name="AlertCircle" size={18} className="mt-0.5 flex-shrink-0 text-red-400" />
                                <div>
                                    <span>{error}</span>
                                    {error.includes('already registered') && (
                                        <div className="mt-2">
                                            <Link to="/login" className="text-primary hover:text-primary/80 font-bold underline transition-colors">
                                                Go to Login →
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4 xl:space-y-5">
                            <div>
                                <label className="block text-sm font-caption font-semibold text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <Icon name="User" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4ade80] transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        value={displayName}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 outline-none transition-all focus:border-[#4ade80]/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(74,222,128,0.15)] font-body"
                                        onChange={(e) => setDisplayName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-caption font-semibold text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Icon name="Mail" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4ade80] transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        placeholder="eg. user@greenergy.org"
                                        value={email}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 outline-none transition-all focus:border-[#4ade80]/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(74,222,128,0.15)] font-body"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-caption font-semibold text-gray-300 mb-2">
                                    Organization / Role
                                </label>
                                <div className="relative group">
                                    <Icon name="Building2" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4ade80] transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Environment Department"
                                        value={organization}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 outline-none transition-all focus:border-[#4ade80]/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(74,222,128,0.15)] font-body"
                                        onChange={(e) => setOrganization(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-caption font-semibold text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative group">
                                    <Icon name="Lock" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#4ade80] transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        placeholder="Enter your password"
                                        value={password}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 outline-none transition-all focus:border-[#4ade80]/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(74,222,128,0.15)] font-body"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full relative overflow-hidden group text-white font-heading font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_0_rgba(45,90,61,0.39)] hover:shadow-[0_6px_20px_rgba(74,222,128,0.23)] hover:-translate-y-0.5 mt-6"
                                style={{ background: loading ? '#059669' : 'linear-gradient(135deg, #2D5A3D 0%, #1A4325 100%)', border: '1px solid rgba(74,222,128,0.3)' }}
                            >
                                <span className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                <div className="flex items-center justify-center gap-2 relative z-10 tracking-wide">
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            Create Account <Icon name="ArrowRight" size={16} />
                                        </>
                                    )}
                                </div>
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-white/10 text-center">
                            <p className="font-caption" style={{ color: "rgba(255,255,255,0.6)" }}>
                                Already have an account?{' '}
                                <Link to="/login" className="text-[#4ade80] hover:text-[#22c55e] font-bold transition-colors duration-200 ml-1">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
