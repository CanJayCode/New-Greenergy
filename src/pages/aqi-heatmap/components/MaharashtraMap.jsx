import React, { useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MAHARASHTRA_GEOJSON, getAQIColor } from "./MaharashtraGeoData";

import L from "leaflet";
delete L?.Icon?.Default?.prototype?._getIconUrl;
L?.Icon?.Default?.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const MAHARASHTRA_CENTER = [19.7515, 75.7139];
const MAHARASHTRA_ZOOM = 6;

function MapEffects() {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [map]);
    return null;
}

function DistrictPanEffect({ selectedDistrict }) {
    const map = useMap();
    useEffect(() => {
        if (selectedDistrict && MAHARASHTRA_GEOJSON?.features) {
            const feature = MAHARASHTRA_GEOJSON.features.find(f => f?.properties?.id === selectedDistrict);
            if (feature) {
                const layer = L.geoJSON(feature);
                const isMobile = window.innerWidth < 768;
                map.flyToBounds(layer.getBounds(), {
                    paddingTopLeft: [50, 50],
                    paddingBottomRight: isMobile ? [50, 50] : [450, 50],
                    duration: 1.25
                });
            }
        }
    }, [selectedDistrict, map]);
    return null;
}

function ResetViewControl({ onReset }) {
    const map = useMap();
    const handleReset = () => {
        map?.setView(MAHARASHTRA_CENTER, MAHARASHTRA_ZOOM);
        if (onReset) onReset();
    };
    return (
        <div style={{ position: "absolute", bottom: 80, right: 10, zIndex: 1000 }}>
            <button
                onClick={handleReset}
                title="Reset View"
                style={{
                    width: 34, height: 34,
                    background: "rgba(15,31,15,0.92)",
                    border: "1px solid rgba(50,205,50,0.3)",
                    borderRadius: 8, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#32CD32", fontSize: 16,
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(50,205,50,0.15)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(15,31,15,0.92)"}
            >
                ⊙
            </button>
        </div>
    );
}

export default function MaharashtraMap({ selectedDistrict, onDistrictClick, aqiRange, districtData, activePollutant = "aqi" }) {
    const geoJsonRef = useRef(null);

    const getDistrictStyle = useCallback((feature) => {
        const id = feature?.properties?.id;
        const d = districtData?.[id];
        const val = activePollutant === "aqi" ? (d?.aqi ?? 0) : (d?.[activePollutant] ?? 0);
        
        // For individual pollutants, we normalize them to AQI colors or use a custom scale
        const aqiInfo = getAQIColor(activePollutant === "aqi" ? val : (val * 2)); 
        const isSelected = selectedDistrict === id;
        const aqi = d?.aqi ?? 0;
        const isFiltered = aqi < (aqiRange?.[0] ?? 0) || aqi > (aqiRange?.[1] ?? 350);

        return {
            fillColor: isFiltered ? "#333" : aqiInfo?.fill,
            fillOpacity: isFiltered ? 0.15 : isSelected ? 0.85 : 0.65,
            color: isSelected ? "#32CD32" : isFiltered ? "#555" : aqiInfo?.stroke,
            weight: isSelected ? 3 : 1.5,
            opacity: isFiltered ? 0.3 : 1,
        };
    }, [selectedDistrict, aqiRange, districtData, activePollutant]);

    const onEachFeature = useCallback((feature, layer) => {
        const id = feature?.properties?.id;
        const name = feature?.properties?.name;
        const d = districtData?.[id];
        const aqi = d?.aqi ?? 0;
        const val = activePollutant === "aqi" ? aqi : (d?.[activePollutant] ?? 0);
        const aqiInfo = getAQIColor(activePollutant === "aqi" ? aqi : (val * 2));

        layer?.on({
            mouseover: (e) => {
                const l = e?.target;
                l?.setStyle({ fillOpacity: 0.9, weight: 2.5, color: "#32CD32" });
                l?.bindTooltip(
                    `<div style="font-family: IBM Plex Sans, sans-serif; padding: 4px 2px;">
            <strong style="color: #E0E8E0; font-size: 13px;">${name}</strong><br/>
            <span style="color: ${aqiInfo?.fill}; font-family: JetBrains Mono, monospace; font-size: 12px; font-weight: 700;">${activePollutant.toUpperCase()}: ${val}</span>
            <span style="color: #8FA88F; font-size: 11px; margin-left: 6px;">${activePollutant === "aqi" ? aqiInfo?.label : ""}</span>
          </div>`,
                    { permanent: false, sticky: true, className: "aqi-tooltip", direction: "top", offset: [0, -8] }
                )?.openTooltip();
            },
            mouseout: (e) => {
                if (geoJsonRef?.current) geoJsonRef?.current?.resetStyle(e?.target);
                e?.target?.closeTooltip();
            },
            click: () => onDistrictClick(id),
        });
    }, [onDistrictClick, districtData]);

    useEffect(() => {
        if (geoJsonRef?.current) geoJsonRef?.current?.setStyle(getDistrictStyle);
    }, [selectedDistrict, aqiRange, getDistrictStyle, districtData]);

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <style>{`
        .leaflet-container { background: #0d1a0d !important; }
        .aqi-tooltip { background: rgba(15,31,15,0.95) !important; border: 1px solid rgba(50,205,50,0.3) !important; border-radius: 10px !important; box-shadow: 0 4px 16px rgba(0,0,0,0.5) !important; padding: 8px 12px !important; backdrop-filter: blur(8px); }
        .aqi-tooltip::before { display: none !important; }
        .leaflet-tooltip-top.aqi-tooltip::before { border-top-color: rgba(50,205,50,0.3) !important; }
        .leaflet-control-zoom a { background: rgba(15,31,15,0.92) !important; color: #32CD32 !important; border-color: rgba(50,205,50,0.3) !important; }
        .leaflet-control-zoom a:hover { background: rgba(50,205,50,0.15) !important; }
        .leaflet-control-attribution { background: rgba(15,31,15,0.7) !important; color: #4A5A4A !important; font-size: 9px !important; }
        .leaflet-control-attribution a { color: #32CD32 !important; }
      `}</style>
            <MapContainer
                center={MAHARASHTRA_CENTER}
                zoom={MAHARASHTRA_ZOOM}
                style={{ width: "100%", height: "100%" }}
                zoomControl={true}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapEffects />
                <DistrictPanEffect selectedDistrict={selectedDistrict} />
                <GeoJSON
                    key={`${selectedDistrict}-${aqiRange?.[0]}-${aqiRange?.[1]}`}
                    ref={geoJsonRef}
                    data={MAHARASHTRA_GEOJSON}
                    style={getDistrictStyle}
                    onEachFeature={onEachFeature}
                />
                <ResetViewControl />
            </MapContainer>
        </div>
    );
}
