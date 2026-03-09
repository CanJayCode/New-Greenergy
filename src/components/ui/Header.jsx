import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';


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

const MAHARASHTRA_DISTRICTS = [
  'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara',
  'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli',
  'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban',
  'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar',
  'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara',
  'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal',
];

export default function Header({ calculationState = null, onDistrictChange, selectedDistrict = '' }) {
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

  const filteredDistricts = MAHARASHTRA_DISTRICTS?.filter((d) =>
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
      {/* Brand Header */}
      <div
        className="w-full bg-primary"
        style={{ height: '48px', zIndex: 'var(--z-navigation)' }}
      >
        <div className="max-w-screen-xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo + Brand */}
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
            <div className="flex flex-col leading-none">
              <span
                className="font-heading font-700 text-white"
                style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.01em' }}
              >
                Greenergy
              </span>
              <span
                className="text-white font-caption"
                style={{ fontSize: '0.65rem', opacity: 0.75, letterSpacing: '0.04em' }}
              >
                Environmental Planning Platform
              </span>
            </div>
          </div>

          {/* Brand right info */}
          <div className="hidden md:flex items-center gap-2">
            <span className="font-caption text-white" style={{ fontSize: '0.75rem', opacity: 0.7 }}>
              Maharashtra Forest Department
            </span>
          </div>
        </div>
      </div>
      {/* Main Navigation Bar */}
      <header
        className="w-full bg-card shadow-nav sticky top-0"
        style={{
          zIndex: 'var(--z-navigation)',
          borderBottom: '1px solid var(--color-border)',
        }}
        ref={mobileMenuRef}
      >
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {NAV_ITEMS?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavClick(item?.path)}
                title={item?.description}
                aria-current={isActive(item?.path) ? 'page' : undefined}
                className="relative flex items-center gap-2 px-4 py-2 rounded-md font-body font-medium text-sm transition-all duration-250"
                style={{
                  color: isActive(item?.path)
                    ? 'var(--color-primary)'
                    : 'var(--color-muted-foreground)',
                  background: isActive(item?.path)
                    ? 'rgba(45, 90, 61, 0.08)'
                    : 'transparent',
                  fontWeight: isActive(item?.path) ? 600 : 500,
                  fontSize: '0.9375rem',
                  minHeight: '44px',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item?.path)) {
                    e.currentTarget.style.background = 'rgba(45, 90, 61, 0.05)';
                    e.currentTarget.style.color = 'var(--color-primary)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item?.path)) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--color-muted-foreground)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.97)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
              >
                <Icon
                  name={item?.icon}
                  size={16}
                  color={isActive(item?.path) ? 'var(--color-primary)' : 'currentColor'}
                  strokeWidth={isActive(item?.path) ? 2.5 : 2}
                />
                {item?.label}
                {/* Active indicator */}
                {isActive(item?.path) && (
                  <span
                    className="absolute bottom-0 left-4 right-4 rounded-full"
                    style={{
                      height: '2px',
                      background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                      borderRadius: '2px',
                    }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3 ml-auto">
            {/* District Quick Selector - desktop */}
            {showDistrictSelector && (
              <div className="hidden lg:block relative" ref={districtRef}>
                <button
                  onClick={() => setDistrictDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md border font-caption text-sm transition-all duration-250"
                  style={{
                    borderColor: districtDropdownOpen
                      ? 'var(--color-primary)'
                      : 'var(--color-border)',
                    background: districtDropdownOpen
                      ? 'rgba(45, 90, 61, 0.06)'
                      : 'var(--color-card)',
                    color: 'var(--color-foreground)',
                    minHeight: '36px',
                    minWidth: '160px',
                    fontSize: '0.8125rem',
                  }}
                  aria-haspopup="listbox"
                  aria-expanded={districtDropdownOpen}
                  aria-label="Select district"
                >
                  <Icon name="MapPin" size={14} color="var(--color-primary)" />
                  <span className="truncate max-w-28">
                    {selectedDistrict || 'Select District'}
                  </span>
                  <Icon
                    name="ChevronDown"
                    size={14}
                    color="var(--color-muted-foreground)"
                    className={`ml-auto transition-transform duration-250 ${districtDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {districtDropdownOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 bg-card rounded-md shadow-xl border overflow-hidden animate-slide-down"
                    style={{
                      width: '240px',
                      zIndex: 'var(--z-dropdown)',
                      borderColor: 'var(--color-border)',
                      boxShadow: 'var(--shadow-xl)',
                    }}
                    role="listbox"
                    aria-label="Maharashtra districts"
                  >
                    {/* Search */}
                    <div className="p-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
                      <div className="flex items-center gap-2 px-2 py-1.5 rounded" style={{ background: 'var(--color-muted)' }}>
                        <Icon name="Search" size={13} color="var(--color-muted-foreground)" />
                        <input
                          type="text"
                          placeholder="Search districts..."
                          value={districtSearch}
                          onChange={(e) => setDistrictSearch(e?.target?.value)}
                          className="flex-1 bg-transparent outline-none font-caption text-xs"
                          style={{ color: 'var(--color-foreground)', fontSize: '0.8125rem' }}
                          autoFocus
                        />
                      </div>
                    </div>

                    {/* Recent */}
                    {!districtSearch && recentDistricts?.length > 0 && (
                      <div className="px-2 pt-2 pb-1">
                        <p className="font-caption px-2 pb-1" style={{ fontSize: '0.7rem', color: 'var(--color-muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          Recent
                        </p>
                        {recentDistricts?.map((d) => (
                          <button
                            key={d}
                            onClick={() => handleDistrictSelect(d)}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-colors duration-150"
                            style={{ fontSize: '0.8125rem', color: 'var(--color-foreground)' }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(45,90,61,0.07)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            role="option"
                            aria-selected={selectedDistrict === d}
                          >
                            <Icon name="Clock" size={12} color="var(--color-muted-foreground)" />
                            {d}
                            {selectedDistrict === d && (
                              <Icon name="Check" size={12} color="var(--color-primary)" className="ml-auto" />
                            )}
                          </button>
                        ))}
                        <div className="border-t mt-1 mb-1" style={{ borderColor: 'var(--color-border)' }} />
                      </div>
                    )}

                    {/* All Districts */}
                    <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
                      {filteredDistricts?.length === 0 ? (
                        <p className="px-4 py-3 font-caption text-center" style={{ fontSize: '0.8125rem', color: 'var(--color-muted-foreground)' }}>
                          No districts found
                        </p>
                      ) : (
                        filteredDistricts?.map((d) => (
                          <button
                            key={d}
                            onClick={() => handleDistrictSelect(d)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-left transition-colors duration-150"
                            style={{ fontSize: '0.8125rem', color: 'var(--color-foreground)' }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(45,90,61,0.07)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            role="option"
                            aria-selected={selectedDistrict === d}
                          >
                            <Icon name="MapPin" size={12} color="var(--color-muted-foreground)" />
                            {d}
                            {selectedDistrict === d && (
                              <Icon name="Check" size={12} color="var(--color-primary)" className="ml-auto" />
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Calculation Status Indicator */}
            {calculationState && (
              <div className="hidden lg:block relative" ref={calcRef}>
                <button
                  onClick={() => setCalcPreviewOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-250"
                  style={{
                    background: 'rgba(34, 139, 34, 0.1)',
                    border: '1px solid rgba(34, 139, 34, 0.25)',
                    color: 'var(--color-success)',
                    minHeight: '36px',
                    fontSize: '0.8125rem',
                  }}
                  aria-label="View active calculation"
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(34,139,34,0.16)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(34,139,34,0.1)'}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: 'var(--color-success)', animation: 'pulse 2s infinite' }}
                  />
                  <span className="font-caption font-medium">Active Calc</span>
                  <Icon name="ChevronDown" size={13} color="currentColor" />
                </button>

                {calcPreviewOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 bg-card rounded-md shadow-xl border p-4 animate-slide-down"
                    style={{
                      width: '260px',
                      zIndex: 'var(--z-dropdown)',
                      borderColor: 'var(--color-border)',
                      boxShadow: 'var(--shadow-xl)',
                    }}
                  >
                    <p className="font-heading font-semibold text-sm mb-3" style={{ color: 'var(--color-foreground)' }}>
                      Calculation Summary
                    </p>
                    <div className="space-y-2">
                      {calculationState?.district && (
                        <div className="flex justify-between items-center">
                          <span className="font-caption text-xs" style={{ color: 'var(--color-muted-foreground)' }}>District</span>
                          <span className="font-data text-xs font-medium" style={{ color: 'var(--color-foreground)' }}>{calculationState?.district}</span>
                        </div>
                      )}
                      {calculationState?.area && (
                        <div className="flex justify-between items-center">
                          <span className="font-caption text-xs" style={{ color: 'var(--color-muted-foreground)' }}>Area</span>
                          <span className="font-data text-xs font-medium" style={{ color: 'var(--color-foreground)' }}>{calculationState?.area} ha</span>
                        </div>
                      )}
                      {calculationState?.trees && (
                        <div className="flex justify-between items-center">
                          <span className="font-caption text-xs" style={{ color: 'var(--color-muted-foreground)' }}>Trees</span>
                          <span className="font-data text-xs font-medium" style={{ color: 'var(--color-success)' }}>{calculationState?.trees?.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => { navigate('/interactive-plantation-calculator'); setCalcPreviewOpen(false); }}
                      className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-md font-caption font-medium text-xs transition-all duration-250"
                      style={{
                        background: 'var(--color-primary)',
                        color: 'var(--color-primary-foreground)',
                        fontSize: '0.8125rem',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      <Icon name="ArrowRight" size={13} color="currentColor" />
                      Return to Calculator
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden flex items-center justify-center rounded-md transition-all duration-250"
              style={{
                width: '44px',
                height: '44px',
                background: mobileMenuOpen ? 'rgba(45,90,61,0.1)' : 'transparent',
                border: '1px solid var(--color-border)',
                color: 'var(--color-foreground)',
              }}
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} color="currentColor" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav"
            className="lg:hidden bg-card border-t animate-slide-down"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <nav className="max-w-screen-xl mx-auto px-4 py-3 space-y-1" aria-label="Mobile navigation">
              {NAV_ITEMS?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavClick(item?.path)}
                  aria-current={isActive(item?.path) ? 'page' : undefined}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-all duration-250"
                  style={{
                    background: isActive(item?.path) ? 'rgba(45,90,61,0.08)' : 'transparent',
                    color: isActive(item?.path) ? 'var(--color-primary)' : 'var(--color-foreground)',
                    fontWeight: isActive(item?.path) ? 600 : 400,
                    fontSize: '0.9375rem',
                    minHeight: '44px',
                    borderLeft: isActive(item?.path) ? '3px solid var(--color-primary)' : '3px solid transparent',
                  }}
                >
                  <Icon name={item?.icon} size={18} color={isActive(item?.path) ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} />
                  <div>
                    <p className="font-body font-medium">{item?.label}</p>
                    <p className="font-caption text-xs mt-0.5" style={{ color: 'var(--color-muted-foreground)', fontSize: '0.75rem' }}>
                      {item?.description}
                    </p>
                  </div>
                </button>
              ))}

              {/* Mobile District Selector */}
              {showDistrictSelector && (
                <div className="pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <p className="font-caption px-4 pb-2" style={{ fontSize: '0.75rem', color: 'var(--color-muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Active District
                  </p>
                  <div className="px-4 pb-2">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-muted)' }}>
                      <Icon name="Search" size={14} color="var(--color-muted-foreground)" />
                      <input
                        type="text"
                        placeholder="Search & select district..."
                        value={districtSearch}
                        onChange={(e) => setDistrictSearch(e?.target?.value)}
                        className="flex-1 bg-transparent outline-none font-caption"
                        style={{ color: 'var(--color-foreground)', fontSize: '0.875rem' }}
                      />
                    </div>
                    {districtSearch && (
                      <div className="mt-2 rounded-md border overflow-hidden" style={{ borderColor: 'var(--color-border)', maxHeight: '160px', overflowY: 'auto' }}>
                        {filteredDistricts?.slice(0, 8)?.map((d) => (
                          <button
                            key={d}
                            onClick={() => handleDistrictSelect(d)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-left transition-colors duration-150"
                            style={{ fontSize: '0.875rem', color: 'var(--color-foreground)', background: selectedDistrict === d ? 'rgba(45,90,61,0.08)' : 'var(--color-card)' }}
                          >
                            <Icon name="MapPin" size={13} color="var(--color-muted-foreground)" />
                            {d}
                          </button>
                        ))}
                      </div>
                    )}
                    {selectedDistrict && !districtSearch && (
                      <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-md" style={{ background: 'rgba(45,90,61,0.08)' }}>
                        <Icon name="MapPin" size={14} color="var(--color-primary)" />
                        <span className="font-caption font-medium text-sm" style={{ color: 'var(--color-primary)' }}>{selectedDistrict}</span>
                        <button
                          onClick={() => onDistrictChange && onDistrictChange('')}
                          className="ml-auto"
                          aria-label="Clear district selection"
                        >
                          <Icon name="X" size={13} color="var(--color-muted-foreground)" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Calc Status */}
              {calculationState && (
                <div className="pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <button
                    onClick={() => { navigate('/interactive-plantation-calculator'); setMobileMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-250"
                    style={{ background: 'rgba(34,139,34,0.08)', minHeight: '44px' }}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--color-success)' }} />
                    <div className="text-left">
                      <p className="font-caption font-medium text-sm" style={{ color: 'var(--color-success)' }}>Active Calculation</p>
                      {calculationState?.district && (
                        <p className="font-caption text-xs" style={{ color: 'var(--color-muted-foreground)' }}>
                          {calculationState?.district} · {calculationState?.area} ha · {calculationState?.trees?.toLocaleString()} trees
                        </p>
                      )}
                    </div>
                    <Icon name="ArrowRight" size={16} color="var(--color-success)" className="ml-auto" />
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}