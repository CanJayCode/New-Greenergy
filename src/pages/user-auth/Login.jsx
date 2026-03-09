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
        try {
            setError("");
            setLoading(true);
            await login(email, password);
            navigate("/dashboard-overview");
        } catch (err) {
            setError("Failed to sign in. Please check your credentials.");
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #0d1a0d 0%, #051005 100%)" }}>
            <div className="w-full max-w-md bg-card rounded-2xl border p-8 shadow-2xl animate-fade-in" style={{ borderColor: "var(--color-border)", background: "rgba(15,31,15,0.8)", backdropFilter: "blur(12px)" }}>
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 mb-4">
                        <Icon name="Leaf" size={24} color="var(--color-primary)" />
                    </div>
                    <h1 className="font-heading font-bold text-2xl text-foreground">Welcome Back</h1>
                    <p className="font-caption text-sm text-muted-foreground mt-2">Sign in to your Greenergy account</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-3">
                        <Icon name="AlertCircle" size={16} className="mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="font-caption text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Email Address</label>
                        <div className="relative group">
                            <Icon name="Mail" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                            <input
                                type="email" required placeholder="name@company.com"
                                className="w-full bg-muted border border-border rounded-xl px-10 py-3 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="font-caption text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Password</label>
                        <div className="relative group">
                            <Icon name="Lock" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                            <input
                                type="password" required placeholder="••••••••"
                                className="w-full bg-muted border border-border rounded-xl px-10 py-3 text-sm outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="text-right">
                        <Link to="/forgot-password" size="sm" className="font-caption text-xs text-primary hover:underline font-medium">Forgot password?</Link>
                    </div>

                    <button
                        type="submit" disabled={loading}
                        className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl transition-all hover:opacity-90 active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
                    >
                        {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Sign In"}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-border text-center">
                    <p className="font-caption text-sm text-muted-foreground">
                        Don't have an account? <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
