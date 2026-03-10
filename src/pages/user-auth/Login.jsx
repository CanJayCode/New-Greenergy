import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Icon from "../../components/AppIcon";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
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
            await login(email, password);
            // Navigate immediately after successful login
            navigate("/dashboard-overview", { replace: true });
        } catch (err) {
            let errorMessage = "Failed to sign in. ";
            
            if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
                errorMessage = "No account found with this email. Please sign up first.";
            } else if (err.code === 'auth/wrong-password') {
                errorMessage = "Incorrect password. Please try again.";
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address format.";
            } else if (err.code === 'auth/user-disabled') {
                errorMessage = "This account has been disabled.";
            } else if (err.code === 'auth/too-many-requests') {
                errorMessage = "Too many failed attempts. Please try again later.";
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
        <div className="min-h-screen flex" style={{ background: "#0a1f0a" }}>
            {/* Left Side - Welcome Section */}
            <div className="hidden lg:flex lg:flex-1 flex-col justify-between p-12 xl:p-16" 
                 style={{ background: "#000000" }}>
                <div>
                    <div className="flex items-center gap-3 mb-16">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary flex items-center justify-center">
                            <Icon name="Leaf" size={24} color="#10b981" />
                        </div>
                        <span className="text-2xl font-bold text-white">Greenergy</span>
                    </div>
                    
                    <h1 className="text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                        Welcome<br />Back
                    </h1>
                    <p className="text-xl text-gray-400 max-w-md">
                        Sign in to access your environmental analytics and continue making data-driven decisions.
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-md">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <Icon name="TrendingUp" size={18} color="#10b981" />
                        </div>
                        <div>
                            <p className="text-white font-medium mb-1">Track Environmental Impact</p>
                            <p className="text-gray-400 text-sm">
                                Monitor air quality, soil health, and plantation metrics across Maharashtra's districts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="text-center lg:text-left mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                        <p className="text-gray-400">Enter your credentials to access your account.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                            <Icon name="AlertCircle" size={18} className="mt-0.5 flex-shrink-0" />
                            <div>
                                <span>{error}</span>
                                {error.includes('No account found') && (
                                    <div className="mt-2">
                                        <Link to="/signup" className="text-primary hover:text-primary/80 font-semibold underline">
                                            Create an Account →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Icon name="Mail" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="email"
                                    required
                                    placeholder="eg. johnfrans@gmail.com"
                                    value={email}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 outline-none transition-all focus:border-primary/50 focus:bg-white/10"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Icon name="Lock" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="password"
                                    required
                                    placeholder="Enter your password"
                                    value={password}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-500 outline-none transition-all focus:border-primary/50 focus:bg-white/10"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            style={{ backgroundColor: loading ? '#059669' : '#10b981' }}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
