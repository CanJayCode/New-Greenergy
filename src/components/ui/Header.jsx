import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { useAuth } from '../../contexts/AuthContext';
import { AnimeNavBar } from './anime-navbar';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    path: '/dashboard-overview',
    icon: 'LayoutDashboard',
    description: 'Central command center with environmental metrics',
  },
  {
    label: 'Calculator',
    path: '/interactive-plantation-calculator',
    icon: 'Calculator',
    description: 'Interactive plantation calculation engine with AQI formulas',
  },
  {
    label: 'Analytics',
    path: '/analytics-dashboard',
    icon: 'BarChart3',
    description: 'Comprehensive data visualization and district comparison',
  },
  {
    label: 'Heatmap',
    path: '/aqi-heatmap',
    icon: 'Map',
    description: 'Geographic AQI visualization across Maharashtra districts',
  },
  {
    label: 'Districts',
    path: '/district-database',
    icon: 'Database',
    description: 'Maharashtra district reference database',
  },
];

const SUPPORTED_REGIONS = [
  'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara',
  'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli',
  'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban',
  'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar',
  'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara',
  'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal',
];

export default function Header({ calculationState = null, onDistrictChange, selectedDistrict = '' }) {
  const { currentUser, userData, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('');
  const [calcPreviewOpen, setCalcPreviewOpen] = useState(false);
  const [recentDistricts, setRecentDistricts] = useState(['Pune', 'Nashik', 'Nagpur']);
  const districtRef = useRef(null);
  const calcRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isActive = (path) => location?.pathname === path;

  const showDistrictSelector = [
    '/interactive-plantation-calculator',
    '/analytics-dashboard',
    '/aqi-heatmap',
  ]?.includes(location?.pathname);

  const filteredDistricts = SUPPORTED_REGIONS?.filter((d) =>
    d?.toLowerCase()?.includes(districtSearch?.toLowerCase())
  );

  const handleDistrictSelect = (district) => {
    setRecentDistricts((prev) => {
      const updated = [district, ...prev?.filter((d) => d !== district)]?.slice(0, 3);
      return updated;
    });
    onDistrictChange && onDistrictChange(district);
    setDistrictDropdownOpen(false);
    setDistrictSearch('');
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (districtRef?.current && !districtRef?.current?.contains(e?.target)) {
        setDistrictDropdownOpen(false);
        setDistrictSearch('');
      }
      if (calcRef?.current && !calcRef?.current?.contains(e?.target)) {
        setCalcPreviewOpen(false);
      }
      if (mobileMenuRef?.current && !mobileMenuRef?.current?.contains(e?.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location?.pathname]);

  return (
    <>
      <AnimeNavBar
        items={NAV_ITEMS.map((item) => ({
          name: item.label,
          url: item.path,
          icon: item.icon,
        }))}
        defaultActive="Dashboard"
        extraLeft={
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-md"
              style={{
                width: '32px',
                height: '32px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '8px',
              }}
            >
              <Icon name="Leaf" size={18} color="#FFFFFF" strokeWidth={2} />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span
                className="font-heading font-bold text-white"
                style={{ fontSize: '0.9rem', letterSpacing: '0.01em' }}
              >
                Greenergy
              </span>
              <span
                className="text-white font-caption hidden lg:block"
                style={{ fontSize: '0.6rem', opacity: 0.75, letterSpacing: '0.04em' }}
              >
                Global Planning
              </span>
            </div>
          </div>
        }
        extraRight={
          <div className="flex items-center gap-3">
            {/* Action Bar (District/Calc) */}
            <div className="hidden lg:flex items-center gap-2">
              {showDistrictSelector && (
                <div className="relative" ref={districtRef}>
                  <button
                    onClick={() => setDistrictDropdownOpen((v) => !v)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white font-caption text-[11px] uppercase tracking-wider border border-white/10"
                  >
                    <Icon name="MapPin" size={12} />
                    <span className="truncate max-w-20">
                      {selectedDistrict || 'District'}
                    </span>
                  </button>
                  {districtDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 bg-black/90 backdrop-blur-md rounded-xl shadow-xl border border-white/20 overflow-hidden"
                         style={{ width: '220px', zIndex: 'var(--z-dropdown)' }}>
                      <div className="p-2 border-b border-white/10">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={districtSearch}
                          onChange={(e) => setDistrictSearch(e.target.value)}
                          className="w-full bg-white/10 text-white placeholder-white/50 text-xs px-2 py-1.5 rounded outline-none"
                          autoFocus
                        />
                      </div>
                      <div className="max-h-[200px] overflow-y-auto p-1 custom-scrollbar">
                        {filteredDistricts.length === 0 ? (
                          <p className="text-white/50 text-xs text-center py-4">No districts found</p>
                        ) : (
                          filteredDistricts.map(d => (
                            <button
                              key={d}
                              onClick={() => handleDistrictSelect(d)}
                              className="w-full text-left text-white/80 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded text-xs transition-colors flex justify-between items-center"
                            >
                              {d}
                              {selectedDistrict === d && <Icon name="Check" size={12} color="#4ade80" />}
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {calculationState && (
                <div className="relative" ref={calcRef}>
                  <button
                    onClick={() => setCalcPreviewOpen((v) => !v)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-green-500/20 hover:bg-green-500/30 transition-all text-green-400 font-caption text-[11px] uppercase tracking-wider border border-green-500/30"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span>Active</span>
                  </button>
                </div>
              )}
            </div>

            <div className="h-4 w-px bg-white/20 hidden sm:block mx-1" />

            {/* User Account */}
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end leading-none">
                  <span className="font-caption text-[11px] font-bold text-white uppercase tracking-wider">
                    {userData?.displayName || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-400 border border-white/20 transition-all flex items-center justify-center text-white"
                >
                  <Icon name="LogOut" size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="text-white/80 hover:text-white font-caption text-xs font-bold uppercase tracking-widest px-2"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-3 py-1.5 rounded-full bg-white text-primary font-caption text-[10px] font-bold uppercase tracking-widest hover:bg-white/90 transition-colors shadow-sm"
                >
                  Join
                </button>
              </div>
            )}
          </div>
        }
      />
      {/* Spacer to account for the fixed navbar */}
      <div className="h-24 md:h-28" />
    </>
  );
}