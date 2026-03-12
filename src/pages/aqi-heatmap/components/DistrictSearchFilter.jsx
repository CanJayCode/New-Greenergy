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
