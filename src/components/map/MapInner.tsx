'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
import Supercluster from 'supercluster';
import { Hotspot, Shelter } from '@/types';
import { Shield, Filter, MapPin } from 'lucide-react';

interface MapInnerProps {
  hotspots: Hotspot[];
  shelters: Shelter[];
}

const PROVINCES = [
  { label: 'Semua Wilayah', value: 'ALL', lat: -0.7893, lng: 108.5, zoom: 5 },
  { label: 'Riau', value: 'Riau', lat: 0.5, lng: 101.8, zoom: 8 },
  { label: 'Jambi', value: 'Jambi', lat: -1.6, lng: 103.6, zoom: 8 },
  { label: 'Sumatera Selatan', value: 'Sumatera Selatan', lat: -3.3, lng: 104.5, zoom: 8 },
  { label: 'Kalimantan Barat', value: 'Kalimantan Barat', lat: -0.1, lng: 110.5, zoom: 7 },
  { label: 'Kalimantan Tengah', value: 'Kalimantan Tengah', lat: -2.0, lng: 113.0, zoom: 7 },
  { label: 'Kalimantan Selatan', value: 'Kalimantan Selatan', lat: -3.1, lng: 115.1, zoom: 8 },
];

export default function MapInner({ hotspots, shelters }: MapInnerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const clusterLayerRef = useRef<L.LayerGroup | null>(null);
  const shelterLayerRef = useRef<L.LayerGroup | null>(null);
  const canvasRendererRef = useRef<L.Canvas | null>(null);

  // Filters state (clean & focused)
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
      radius: 45,
      maxZoom: 16,
    });
    sc.load(points);
    return sc;
  }, [filteredHotspots]);

  // Fast cluster rendering without DOM churn
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
        const color = count > 100 ? '#b91c1c' : count > 30 ? '#c2410c' : '#ea580c';

        const icon = L.divIcon({
          html: `<div class="custom-cluster-marker" style="width:${size}px; height:${size}px; background:${color}; font-size:${size > 36 ? 12 : 11}px;">
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
          radius: isHigh ? 5 : 4,
          fillColor: isHigh ? '#ef4444' : '#f97316',
          color: '#ffffff',
          weight: 1,
          opacity: 0.9,
          fillOpacity: 0.85,
        });

        circle.bindPopup(`
          <div style="padding:10px; font-family: monospace; font-size:12px; line-height:1.4; color:#f8fafc;">
            <div style="font-weight:700; color:#f97316; margin-bottom:4px; font-size:13px;">
              TITIK API TERDETEKSI
            </div>
            <div><strong>Wilayah:</strong> ${h.regency}, ${h.province}</div>
            <div><strong>Satelit:</strong> ${h.satellite}</div>
            <div><strong>Kepercayaan:</strong> ${h.confidence}%</div>
            <div><strong>Brightness:</strong> ${h.brightness} K</div>
            <div><strong>Waktu:</strong> ${h.acquisition_date} ${h.acquisition_time}</div>
            <div><strong>Koordinat:</strong> ${lat.toFixed(4)}, ${lng.toFixed(4)}</div>
          </div>
        `);

        clusterLayer.addLayer(circle);
      }
    });
  }, [superclusterIndex]);

  // Render Shelter Layer
  const renderShelters = useCallback(() => {
    const layer = shelterLayerRef.current;
    if (!layer) return;
    layer.clearLayers();

    if (!showShelters) return;

    shelters.forEach((s) => {
      const occRatio = Math.round((s.current_occupants / s.capacity) * 100);

      const icon = L.divIcon({
        html: `
          <div style="width:28px; height:28px; border-radius:6px; background:#065f46; border:2px solid #34d399; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.5); cursor:pointer;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
        `,
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const popup = `
        <div style="padding:10px; font-family: monospace; font-size:12px; line-height:1.4; color:#f8fafc;">
          <div style="font-weight:700; color:#34d399; font-size:13px; margin-bottom:2px;">
            ${s.code}: ${s.name}
          </div>
          <div style="color:#94a3b8; font-size:11px; margin-bottom:6px;">${s.address}</div>
          <div style="margin-bottom:4px;"><strong>Keterisian:</strong> ${s.current_occupants} / ${s.capacity} Jiwa (${occRatio}%)</div>
          <div><strong>PIC:</strong> ${s.pic_name} (${s.pic_phone})</div>
          <a href="/posko?shelterId=${s.id}" style="display:inline-block; margin-top:8px; padding:4px 8px; background:#059669; color:#ffffff; text-decoration:none; border-radius:4px; font-size:11px; font-weight:700;">
            Lihat Manifes Korban →
          </a>
        </div>
      `;

      const marker = L.marker([s.latitude, s.longitude], { icon }).bindPopup(popup);
      layer.addLayer(marker);
    });
  }, [shelters, showShelters]);

  // Initial Leaflet Map Setup (runs strictly once)
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

    // High performance Dark Basemap
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
      attribution: '&copy; CARTO &copy; BNPB 2026',
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const clusterLayer = L.layerGroup().addTo(map);
    const shelterLayer = L.layerGroup().addTo(map);

    clusterLayerRef.current = clusterLayer;
    shelterLayerRef.current = shelterLayer;
    mapRef.current = map;

    // Critical fix: invalidateSize to ensure Leaflet renders tiles even if container flex is computing
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

  // Update clusters when superclusterIndex changes
  useEffect(() => {
    renderClusters();
  }, [renderClusters]);

  // Update shelters when showShelters changes
  useEffect(() => {
    renderShelters();
  }, [renderShelters]);

  // Handle province flyTo
  const handleProvinceSelect = (provValue: string) => {
    setSelectedProvince(provValue);
    const prov = PROVINCES.find((p) => p.value === provValue);
    if (prov && mapRef.current) {
      mapRef.current.flyTo([prov.lat, prov.lng], prov.zoom, { duration: 0.8 });
    }
  };

  return (
    <div className="relative w-full h-[580px] bg-[#090d16] overflow-hidden select-none">
      {/* Real Map DOM Mount Container */}
      <div
        ref={mapContainerRef}
        id="leaflet-gis-map"
        className="w-full h-full"
        style={{ minHeight: '580px', width: '100%', height: '100%' }}
      />

      {/* Clean, Restrained Floating Control Bar (Anti-Slop / Taste-Skill) */}
      <div className="absolute top-3 left-3 right-3 sm:right-auto sm:left-4 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="bg-[#0b1220]/95 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 shadow-xl pointer-events-auto flex flex-wrap items-center gap-3 text-xs font-mono">
          {/* Active Points Count */}
          <div className="flex items-center gap-1.5 pr-2 border-r border-slate-800 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="text-white font-bold">{filteredHotspots.length}</span>
            <span className="text-slate-400">Titik Api</span>
          </div>

          {/* Satellite Selector */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400">Satelit:</span>
            <select
              value={selectedSatellite}
              onChange={(e) => setSelectedSatellite(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value="ALL">Semua Sensor</option>
              <option value="NASA-TERRA/AQUA">TERRA/AQUA</option>
              <option value="NASA-NOAA20">NOAA20</option>
              <option value="VIIRS">VIIRS</option>
            </select>
          </div>

          {/* Province Focus */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400">Fokus:</span>
            <select
              value={selectedProvince}
              onChange={(e) => handleProvinceSelect(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-orange-500"
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
            className={`px-2 py-1 rounded border transition-colors ${
              minConfidence > 0
                ? 'bg-red-950/80 text-red-300 border-red-700 font-bold'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            {minConfidence > 0 ? '≥80% Tingkat Tinggi' : 'Semua Kepercayaan'}
          </button>

          {/* Shelter Layer Toggle */}
          <button
            onClick={() => setShowShelters(!showShelters)}
            className={`flex items-center gap-1 px-2 py-1 rounded border transition-colors ${
              showShelters
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700 font-bold'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            <Shield className="w-3 h-3 text-emerald-400" />
            Posko ({shelters.length})
          </button>
        </div>
      </div>

      {/* Minimal Legend Bottom-Left */}
      <div className="absolute bottom-3 left-3 z-10 bg-[#0b1220]/90 backdrop-blur-sm border border-slate-800 rounded px-2.5 py-1.5 text-[11px] font-mono text-slate-400 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
          <span>Tinggi (≥80%)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span>
          <span>Sedang</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-2.5 rounded bg-emerald-600 inline-block"></span>
          <span>Posko Evakuasi</span>
        </div>
      </div>
    </div>
  );
}
