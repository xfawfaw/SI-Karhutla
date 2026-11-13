'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
import Supercluster from 'supercluster';
import { Hotspot, Shelter } from '@/types';
import { Shield, Filter, MapPin, Layers, Flame, Radio } from 'lucide-react';

interface MapInnerProps {
  hotspots: Hotspot[];
  shelters: Shelter[];
}

const PROVINCES = [
  { label: 'Semua Wilayah Prioritas', value: 'ALL', lat: -0.7893, lng: 108.5, zoom: 5 },
  { label: 'Riau (Kampar/Pelalawan)', value: 'Riau', lat: 0.5, lng: 101.8, zoom: 8 },
  { label: 'Jambi (Muaro Jambi)', value: 'Jambi', lat: -1.6, lng: 103.6, zoom: 8 },
  { label: 'Sumsel (Palembang/OKI)', value: 'Sumatera Selatan', lat: -3.3, lng: 104.5, zoom: 8 },
  { label: 'Kalbar (Ketapang)', value: 'Kalimantan Barat', lat: -0.1, lng: 110.5, zoom: 7 },
  { label: 'Kalteng (Sampit/Kotim)', value: 'Kalimantan Tengah', lat: -2.0, lng: 113.0, zoom: 7 },
  { label: 'Kalsel (Banjar/Tanah Laut)', value: 'Kalimantan Selatan', lat: -3.1, lng: 115.1, zoom: 8 },
];

export default function MapInner({ hotspots, shelters }: MapInnerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const clusterLayerRef = useRef<L.LayerGroup | null>(null);
  const shelterLayerRef = useRef<L.LayerGroup | null>(null);
  const canvasRendererRef = useRef<L.Canvas | null>(null);

  // Filters state
  const [selectedSatellite, setSelectedSatellite] = useState<string>('ALL');
  const [minConfidence, setMinConfidence] = useState<number>(0);
  const [selectedProvince, setSelectedProvince] = useState<string>('ALL');
  const [showShelters, setShowShelters] = useState<boolean>(true);

  // Filtered hotspots (memoized)
  const filteredHotspots = useMemo(() => {
    return hotspots.filter((h) => {
      const matchSat = selectedSatellite === 'ALL' || h.satellite === selectedSatellite;
      const matchConf = h.confidence >= minConfidence;
      const matchProv = selectedProvince === 'ALL' || h.province === selectedProvince;
      return matchSat && matchConf && matchProv;
    });
  }, [hotspots, selectedSatellite, minConfidence, selectedProvince]);

  // Build Supercluster index only when filteredHotspots change
  const superclusterIndex = useMemo(() => {
    const points: GeoJSON.Feature<GeoJSON.Point, Hotspot>[] = filteredHotspots.map((h) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [h.longitude, h.latitude],
      },
      properties: h,
    }));

    const sc = new Supercluster({
      radius: 50,
      maxZoom: 16,
    });
    sc.load(points);
    return sc;
  }, [filteredHotspots]);

  // Fast cluster rendering with smooth rounded markers
  const renderClusters = useCallback(() => {
    const map = mapRef.current;
    const clusterLayer = clusterLayerRef.current;
    const canvasRenderer = canvasRendererRef.current;
    if (!map || !clusterLayer || !canvasRenderer) return;

    clusterLayer.clearLayers();

    const bounds = map.getBounds();
    const bbox: [number, number, number, number] = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ];
    const zoom = Math.floor(map.getZoom());

    const clusters = superclusterIndex.getClusters(bbox, zoom);

    clusters.forEach((feat) => {
      const [lng, lat] = feat.geometry.coordinates;
      const isCluster = feat.properties.cluster;

      if (isCluster) {
        const count = feat.properties.point_count;
        const clusterId = feat.properties.cluster_id;

        const size = count > 100 ? 44 : count > 30 ? 38 : 32;
        const bgColor = count > 100 ? '#eb3b5a' : count > 30 ? '#ff5722' : '#e6a73c';
        const textColor = count > 30 ? '#ffffff' : '#121212';

        const icon = L.divIcon({
          html: `<div style="width:${size}px; height:${size}px; border-radius:9999px; background:${bgColor}; color:${textColor}; font-family:'PPRightGrotesk', sans-serif; font-size:${size > 36 ? 13 : 11}px; font-weight:700; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(0,0,0,0.25); border: 2px solid #ffffff;">
                  ${count}
                 </div>`,
          className: '',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        const marker = L.marker([lat, lng], { icon });
        marker.on('click', () => {
          const expansionZoom = Math.min(
            superclusterIndex.getClusterExpansionZoom(clusterId),
            16
          );
          map.flyTo([lat, lng], expansionZoom, { duration: 0.5 });
        });

        clusterLayer.addLayer(marker);
      } else {
        const h = feat.properties as Hotspot;
        const isHigh = h.confidence >= 80;

        // Use Canvas circle marker for 60 FPS zero-DOM-overhead performance
        const circle = L.circleMarker([lat, lng], {
          renderer: canvasRenderer,
          radius: isHigh ? 6 : 4.5,
          fillColor: isHigh ? '#eb3b5a' : '#ff5722',
          color: '#ffffff',
          weight: 1.5,
          opacity: 1,
          fillOpacity: 0.9,
        });

        circle.bindPopup(`
          <div style="padding:14px; font-family: 'Inter', sans-serif; font-size:12px; line-height:1.5; color:#121212; background:#ffffff; border-radius:16px;">
            <div style="font-weight:700; background:#ff5722; color:#ffffff; padding:3px 8px; border-radius:9999px; display:inline-block; margin-bottom:8px; font-size:11px;">
              🔥 HOTSPOT ${h.confidence}% CONF
            </div>
            <div><strong>Wilayah:</strong> ${h.regency}, ${h.province}</div>
            <div><strong>Satelit:</strong> ${h.satellite}</div>
            <div><strong>Kecerahan:</strong> ${h.brightness} K</div>
            <div><strong>Waktu Deteksi:</strong> ${h.acquisition_date} ${h.acquisition_time}</div>
            <div style="margin-top:6px; font-size:11px; color:#666;">[${lat.toFixed(4)}, ${lng.toFixed(4)}]</div>
          </div>
        `);

        clusterLayer.addLayer(circle);
      }
    });
  }, [superclusterIndex]);

  // Render Shelter Layer with smooth rounded badge
  const renderShelters = useCallback(() => {
    const layer = shelterLayerRef.current;
    if (!layer) return;
    layer.clearLayers();

    if (!showShelters) return;

    shelters.forEach((s) => {
      const occRatio = Math.round((s.current_occupants / s.capacity) * 100);

      const icon = L.divIcon({
        html: `
          <div style="width:36px; height:36px; border-radius:12px; background:#20bf6b; border:2px solid #ffffff; box-shadow:0 4px 14px rgba(0,0,0,0.2); display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
        `,
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const popup = `
        <div style="padding:14px; font-family: 'Inter', sans-serif; font-size:12px; line-height:1.5; color:#121212; background:#ffffff; border-radius:16px;">
          <div style="font-weight:700; background:#20bf6b; color:#ffffff; border-radius:9999px; padding:3px 8px; display:inline-block; font-size:11px; margin-bottom:6px;">
            🛡️ ${s.code}: ${s.name}
          </div>
          <div style="color:#555; font-size:11px; margin-bottom:6px;">${s.address}</div>
          <div style="font-weight:600; margin-bottom:4px;">Keterisian: ${s.current_occupants} / ${s.capacity} Jiwa (${occRatio}%)</div>
          <div><strong>PIC:</strong> ${s.pic_name} (${s.pic_phone})</div>
          <a href="/#posko" style="display:inline-block; margin-top:8px; padding:6px 12px; border-radius:9999px; background:#121212; color:#ffffff; text-decoration:none; font-size:11px; font-weight:600;">
            LIHAT DIREKTORI KORBAN →
          </a>
        </div>
      `;

      const marker = L.marker([s.latitude, s.longitude], { icon }).bindPopup(popup);
      layer.addLayer(marker);
    });
  }, [shelters, showShelters]);

  // Initial Leaflet Map Setup
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const canvasRenderer = L.canvas({ padding: 0.5 });
    canvasRendererRef.current = canvasRenderer;

    const map = L.map(mapContainerRef.current, {
      center: [-0.7893, 108.5],
      zoom: 5,
      minZoom: 4,
      maxZoom: 17,
      preferCanvas: true,
      zoomControl: false,
    });

    // 100% Free OpenStreetMap Tile Layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Data &copy; BNPB 2026',
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const clusterLayer = L.layerGroup().addTo(map);
    const shelterLayer = L.layerGroup().addTo(map);

    clusterLayerRef.current = clusterLayer;
    shelterLayerRef.current = shelterLayer;
    mapRef.current = map;

    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
      renderClusters();
    }, 150);

    const handleMove = () => {
      renderClusters();
    };

    map.on('moveend', handleMove);

    return () => {
      clearTimeout(resizeTimer);
      map.off('moveend', handleMove);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    renderClusters();
  }, [renderClusters]);

  useEffect(() => {
    renderShelters();
  }, [renderShelters]);

  const handleProvinceSelect = (provValue: string) => {
    setSelectedProvince(provValue);
    const prov = PROVINCES.find((p) => p.value === provValue);
    if (prov && mapRef.current) {
      mapRef.current.flyTo([prov.lat, prov.lng], prov.zoom, { duration: 0.8 });
    }
  };

  return (
    <div className="relative isolate z-10 w-full h-[620px] rounded-3xl bg-[#e5e2da] overflow-hidden shadow-xl">
      {/* Map DOM Mount */}
      <div
        ref={mapContainerRef}
        id="leaflet-gis-map"
        className="w-full h-full"
        style={{ minHeight: '620px', width: '100%', height: '100%' }}
      />

      {/* Modern, Neat, High-ZIndex Floating Control Dock (z-[1000] to never be covered by Leaflet) */}
      <div className="absolute top-4 left-4 right-4 sm:right-auto z-[1000] pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-black/10 p-2.5 sm:p-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-sans">
          {/* Active Points Count Pill */}
          <div className="bg-[#dc5645] text-white font-mono font-bold px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
            <span>{filteredHotspots.length} TITIK PANAS</span>
          </div>

          {/* Satellite Selector */}
          <div className="flex items-center gap-1.5 bg-[#f5f2eb] px-3 py-1.5 rounded-xl border border-black/5">
            <span className="font-bold text-slate-500 text-[10px] uppercase font-mono">SENSOR:</span>
            <select
              value={selectedSatellite}
              onChange={(e) => setSelectedSatellite(e.target.value)}
              className="bg-transparent font-medium text-[#121212] focus:outline-none cursor-pointer text-xs"
            >
              <option value="ALL">SEMUA SENSOR</option>
              <option value="NASA-TERRA/AQUA">TERRA / AQUA</option>
              <option value="NASA-NOAA20">NOAA20</option>
              <option value="VIIRS">VIIRS</option>
            </select>
          </div>

          {/* Province Focus */}
          <div className="flex items-center gap-1.5 bg-[#f5f2eb] px-3 py-1.5 rounded-xl border border-black/5">
            <span className="font-bold text-slate-500 text-[10px] uppercase font-mono">WILAYAH:</span>
            <select
              value={selectedProvince}
              onChange={(e) => handleProvinceSelect(e.target.value)}
              className="bg-transparent font-medium text-[#121212] focus:outline-none cursor-pointer text-xs"
            >
              {PROVINCES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Confidence Filter Toggle */}
          <button
            onClick={() => setMinConfidence(minConfidence === 0 ? 80 : 0)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs ${
              minConfidence > 0
                ? 'bg-[#eb3b5a] text-white shadow-sm'
                : 'bg-[#f5f2eb] text-[#121212] hover:bg-black/5'
            }`}
          >
            {minConfidence > 0 ? '🔥 TINGGI (≥80%)' : 'SEMUA TINGKAT'}
          </button>

          {/* Shelter Layer Toggle */}
          <button
            onClick={() => setShowShelters(!showShelters)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all text-xs ${
              showShelters
                ? 'bg-[#20bf6b] text-white shadow-sm'
                : 'bg-[#f5f2eb] text-slate-400 hover:bg-black/5'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>POSKO ({shelters.length})</span>
          </button>
        </div>
      </div>

      {/* Modern, Neat Legend Bottom-Left (z-[1000] guaranteed always visible) */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-black/10 px-4 py-2.5 font-sans text-xs hidden sm:flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#eb3b5a] inline-block shadow-sm"></span>
          <span className="text-slate-700 font-medium">≥80% Sangat Rawan</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5722] inline-block shadow-sm"></span>
          <span className="text-slate-700 font-medium">Sedang</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#e6a73c] inline-block shadow-sm"></span>
          <span className="text-slate-700 font-medium">Klaster Api</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-md bg-[#20bf6b] inline-block shadow-sm"></span>
          <span className="text-slate-700 font-medium">Posko Evakuasi</span>
        </div>
      </div>
    </div>
  );
}
