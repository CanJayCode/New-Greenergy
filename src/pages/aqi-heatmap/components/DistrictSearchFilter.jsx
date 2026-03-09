import React, { useState, useRef, useEffect } from "react";
import Icon from "components/AppIcon";
import { DISTRICT_LABELS } from "./MaharashtraGeoData";

export default function DistrictSearchFilter({ onSelectDistrict, selectedDistrict, aqiRange, onAQIRangeChange }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const districtList = Object.entries(DISTRICT_LABELS)?.map(([id, name]) => ({ id, name }));
    const filtered = districtList?.filter((d) =>
        d?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef?.current && !dropdownRef?.current?.contains(e?.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (id) => {
        onSelectDistrict(id);
        setSearchQuery(DISTRICT_LABELS?.[id] || "");
        setIsOpen(false);
    };

    const handleClear = () => {
        onSelectDistrict(null);
        setSearchQuery("");
        setIsOpen(false);
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            {/* District Search */}
            <div className="relative" ref={dropdownRef}>
                <div
                    className="flex items-center gap-2 rounded-xl px-3 py-2 cursor-pointer"
                    style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        minWidth: 200,
                    }}
                    onClick={() => setIsOpen((v) => !v)}
                >
                    <Icon name="Search" size={14} color="var(--color-muted-foreground)" />
                    <input
                        type="text"
                        placeholder="Search district..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e?.target?.value); setIsOpen(true); }}
                        onClick={(e) => { e?.stopPropagation(); setIsOpen(true); }}
                        className="bg-transparent outline-none font-caption text-sm flex-1"
                        style={{ color: "var(--color-foreground)", fontSize: "0.8rem", minWidth: 120 }}
                    />
                    {searchQuery && (
                        <button onClick={(e) => { e?.stopPropagation(); handleClear(); }}>
                            <Icon name="X" size={13} color="var(--color-muted-foreground)" />
                        </button>
                    )}
                    <Icon name="ChevronDown" size={13} color="var(--color-muted-foreground)" />
                </div>
                {isOpen && (
                    <div
                        className="absolute top-full left-0 mt-1 rounded-xl overflow-hidden z-50"
                        style={{
                            background: "var(--color-card)",
                            border: "1px solid var(--color-border)",
                            boxShadow: "var(--shadow-xl)",
                            minWidth: 220,
                            maxHeight: 240,
                            overflowY: "auto",
                        }}
                    >
                        {filtered?.length === 0 ? (
                            <div className="px-4 py-3 font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>
                                No districts found
                            </div>
                        ) : (
                            filtered?.map((d) => (
                                <button
                                    key={d?.id}
                                    onClick={() => handleSelect(d?.id)}
                                    className="w-full text-left px-4 py-2.5 font-caption text-sm transition-colors duration-150"
                                    style={{
                                        color: selectedDistrict === d?.id ? "var(--color-accent)" : "var(--color-foreground)",
                                        background: selectedDistrict === d?.id ? "rgba(50,205,50,0.1)" : "transparent",
                                        fontSize: "0.82rem",
                                    }}
                                    onMouseEnter={(e) => { if (selectedDistrict !== d?.id) e.currentTarget.style.background = "var(--color-muted)"; }}
                                    onMouseLeave={(e) => { if (selectedDistrict !== d?.id) e.currentTarget.style.background = "transparent"; }}
                                >
                                    {d?.name}
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>
            {/* AQI Range Filter */}
            <div className="flex items-center gap-2">
                <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)", fontSize: "0.75rem" }}>AQI:</span>
                <div className="flex items-center gap-1.5">
                    <input
                        type="range"
                        min={0}
                        max={300}
                        value={aqiRange?.[0]}
                        onChange={(e) => onAQIRangeChange([parseInt(e?.target?.value), aqiRange?.[1]])}
                        className="w-20 h-1 accent-lime-400"
                        style={{ accentColor: "var(--color-accent)" }}
                    />
                    <span className="font-data text-xs" style={{ color: "var(--color-accent)", minWidth: 28 }}>{aqiRange?.[0]}</span>
                    <span className="font-caption text-xs" style={{ color: "var(--color-muted-foreground)" }}>–</span>
                    <input
                        type="range"
                        min={0}
                        max={350}
                        value={aqiRange?.[1]}
                        onChange={(e) => onAQIRangeChange([aqiRange?.[0], parseInt(e?.target?.value)])}
                        className="w-20 h-1"
                        style={{ accentColor: "var(--color-accent)" }}
                    />
                    <span className="font-data text-xs" style={{ color: "var(--color-accent)", minWidth: 28 }}>{aqiRange?.[1]}</span>
                </div>
            </div>
        </div>
    );
}
