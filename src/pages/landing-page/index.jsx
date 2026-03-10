import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollExpandMedia from '../../components/ui/scroll-expansion-hero';
import Icon from '../../components/AppIcon';

const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Reset scroll when entering
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black">
            {/* Navigation Overlay */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
                <div className="flex items-center gap-3 pointer-events-auto">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/50 flex items-center justify-center backdrop-blur-md">
                        <Icon name="Leaf" size={24} color="#10b981" />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tighter uppercase">Greenergy</span>
                </div>

                <div className="flex gap-4 pointer-events-auto">
                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2 rounded-xl text-white font-bold tracking-widest uppercase text-xs hover:bg-white/10 transition-colors"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-6 py-2 rounded-xl bg-primary text-white font-bold tracking-widest uppercase text-xs shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section with Scroll Expansion */}
            {/* Alternative visual: https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2560 (Majestic Mountain) */}
            <ScrollExpandMedia
                mediaType="video"
                mediaSrc="https://www.youtube.com/watch?v=6v2L2UGZJAM" // Lush Rain Forest 4K
                bgImageSrc="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop"
                title="RESTORE NATURE"
                date="ENVIRONMENTAL PLANNING"
                scrollToExpand="SCROLL TO EXPLORE"
                textBlend={true}
            >
                {/* Content appearing after expansion */}
                <div className="max-w-6xl mx-auto py-20 text-white">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-6xl font-black mb-8 leading-none tracking-tighter">
                                THE FUTURE IS <span className="text-primary">GREEN</span>
                            </h2>
                            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                                Greenergy is a premier environmental planning platform,
                                designed to empower organizations and conservationists
                                with real-time analytics, AQI heatmaps, and
                                intelligent plantation strategies.
                            </p>

                            <div className="space-y-6">
                                <FeatureItem
                                    icon="BarChart3"
                                    title="Advanced Analytics"
                                    description="Visualize environmental metrics with high-precision data across multiple parameters."
                                />
                                <FeatureItem
                                    icon="Map"
                                    title="AQI Heatmaps"
                                    description="Monitor air quality trends across regions in real-time."
                                />
                                <FeatureItem
                                    icon="Calculator"
                                    title="Plantation Planner"
                                    description="Optimize your forestation efforts with intelligent planting formulas."
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-green-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <div className="relative bg-black border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
                                <div className="mb-6 flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                    </div>
                                    <span className="text-[10px] text-gray-500 font-mono">Live environmental feed / 2026</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse"></div>
                                    <div className="h-20 bg-white/5 rounded-2xl w-full flex items-center justify-center">
                                        <Icon name="Activity" size={32} className="text-primary/50" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="h-16 bg-white/5 rounded-xl"></div>
                                        <div className="h-16 bg-white/5 rounded-xl"></div>
                                        <div className="h-16 bg-white/5 rounded-xl"></div>
                                    </div>
                                    <div className="h-4 bg-white/5 rounded-full w-1/2"></div>
                                </div>

                                <div className="mt-8 text-center pt-8 border-t border-white/5">
                                    <h3 className="text-2xl font-bold mb-4">Ready to start?</h3>
                                    <button
                                        onClick={() => navigate('/signup')}
                                        className="w-full bg-primary hover:bg-primary/90 text-black font-black py-4 rounded-xl transition-all shadow-xl shadow-primary/20"
                                    >
                                        ACCESS PLATFORM
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Partners section removed */}
                </div>
            </ScrollExpandMedia>

            <footer className="bg-black py-20 border-t border-white/5 px-8">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <Icon name="Leaf" size={20} className="text-primary" />
                        <span className="text-xl font-black text-white uppercase tracking-tighter">Greenergy</span>
                    </div>
                    <div className="flex gap-8 text-gray-500 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                    <p className="text-gray-600 text-xs">© 2026 Greenergy Team. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureItem = ({ icon, title, description }) => (
    <div className="flex gap-6 group">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-500">
            <Icon name={icon} size={28} className="text-gray-400 group-hover:text-primary transition-colors" />
        </div>
        <div>
            <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h4>
            <p className="text-gray-500 leading-relaxed text-sm">
                {description}
            </p>
        </div>
    </div>
);

export default LandingPage;
