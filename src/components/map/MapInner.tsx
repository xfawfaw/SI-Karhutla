'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
import Supercluster from 'supercluster';
import { Hotspot, Shelter } from '@/types';
import { Flame, Shield, Filter, MapPin, Gauge, Layers, Info } from 'lucide-react';

interface MapInnerProps {
  hotspots: Hotspot[];
  shelters: Shelter[];
}

const PROVINCE_COORDINATES: Record<string, { lat: number; lng: number; zoom: number }> = {
  ALL: { lat: -0.7893, lng: 108.5, zoom: 6 },
  Riau: { lat: 0.5, lng: 101.8, zoom: 8 },
  Jambi: { lat: -1.6, lng: 103.6, zoom: 8 },
  'Sumatera Selatan': { lat: -3.3, lng: 104.5, zoom: 8 },
  'Kalimantan Barat': { lat: -0.1, lng: 110.5, zoom: 7 },
  'Kalimantan Tengah': { lat: -2.0, lng: 113.0, zoom: 7 },
  'Kalimantan Selatan': { lat: -3.1, lng: 115.1, zoom: 8 },
};

export default function MapInner({ hotspots, shelters }: MapInnerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const clusterLayerRef = useRef<L.LayerGroup | null>(null);
  const shelterLayerRef = useRef<L.LayerGroup | null>(null);

  // Filters state
  const [selectedSatellite, setSelectedSatellite] = useState<string>('ALL');
  const [minConfidence, setMinConfidence] = useState<number>(0);
  const [selectedProvince, setSelectedProvince] = useState<string>('ALL');
  const [showShelters, setShowShelters] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(60);

  // FPS meter counter
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };

    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Filtered hotspots
  const filteredHotspots = useMemo(() => {
    return hotspots.filter((h) => {
      const matchSat = selectedSatellite === 'ALL' || h.satellite === selectedSatellite;
      const matchConf = h.confidence >= minConfidence;
      const matchProv = selectedProvince === 'ALL' || h.province === selectedProvince;
      return matchSat && matchConf && matchProv;
    });
  }, [hotspots, selectedSatellite, minConfidence, selectedProvince]);

  // Build Supercluster index
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

  // Update Clusters on the map
  const updateClusters = useCallback(() => {
    if (!mapRef.current || !clusterLayerRef.current) return;
    const map = mapRef.current;
    const clusterLayer = clusterLayerRef.current;
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

        // Visual size & color based on density
        let size = 36;
        let colorClass = 'bg-orange-600';
        if (count > 100) {
          size = 52;
          colorClass = 'bg-red-700';
        } else if (count > 30) {
          size = 44;
          colorClass = 'bg-red-600';
        }

        const icon = L.divIcon({
          html: `<div class="custom-cluster-marker ${colorClass}" style="width: ${size}px; height: ${size}px;">
                  <span class="text-xs font-mono font-bold tracking-tighter">${count}</span>
                 </div>`,
          className: '',
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });

        const marker = L.marker([lat, lng], { icon });
        marker.on('click', () => {
          const expansionZoom = Math.min(
            superclusterIndex.getClusterExpansionZoom(clusterId),
            17
          );
          map.flyTo([lat, lng], expansionZoom, { duration: 0.8 });
        });

        clusterLayer.addLayer(marker);
      } else {
        const h = feat.properties as Hotspot;
        const isHighConf = h.confidence >= 80;

        const icon = L.divIcon({
          html: `<div class="w-4 h-4 rounded-full ${
            isHighConf ? 'bg-red-500 animate-pulse' : 'bg-orange-400'
          } border-2 border-white shadow-md cursor-pointer flex items-center justify-center">
                  <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
                 </div>`,
          className: '',
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        const popupHtml = `
          <div class="p-2 space-y-1.5 font-sans text-xs">
            <div class="flex items-center justify-between border-b border-slate-700 pb-1">
              <span class="font-bold text-red-400 font-mono">HOTSPOT DETECTED</span>
              <span class="text-[10px] bg-red-950 text-red-300 border border-red-800 px-1 py-0.5 rounded font-mono font-semibold">
                ${h.confidence}% Conf
              </span>
            </div>
            <div class="space-y-0.5 text-slate-300">
              <p><strong class="text-white">Wilayah:</strong> ${h.regency}, ${h.province}</p>
              <p><strong class="text-white">Satelit:</strong> ${h.satellite}</p>
              <p><strong class="text-white">Waktu Deteksi:</strong> ${h.acquisition_date} ${h.acquisition_time}</p>
              <p><strong class="text-white">Brightness:</strong> ${h.brightness} K</p>
              <p><strong class="text-white">Koordinat:</strong> ${h.latitude.toFixed(4)}, ${h.longitude.toFixed(4)}</p>
            </div>
          </div>
        `;

        const marker = L.marker([lat, lng], { icon }).bindPopup(popupHtml);
        clusterLayer.addLayer(marker);
      }
    });
  }, [superclusterIndex]);

  // Update Shelter markers
  const updateShelters = useCallback(() => {
    if (!shelterLayerRef.current) return;
    const layer = shelterLayerRef.current;
    layer.clearLayers();

    if (!showShelters) return;

    shelters.forEach((s) => {
      const percentage = Math.round((s.current_occupants / s.capacity) * 100);
      let statusColor = 'bg-emerald-500';
      if (percentage >= 85) statusColor = 'bg-red-500';
      else if (percentage >= 60) statusColor = 'bg-amber-500';

      const icon = L.divIcon({
        html: `
          <div class="relative group cursor-pointer">
            <div class="w-8 h-8 rounded-lg bg-emerald-700 border-2 border-emerald-300 shadow-lg flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span class="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full ${statusColor} border border-slate-900"></span>
          </div>
        `,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const popupHtml = `
        <div class="p-2 space-y-1.5 font-sans text-xs">
          <div class="flex items-center justify-between border-b border-slate-700 pb-1">
            <span class="font-bold text-emerald-400 font-mono">${s.code}</span>
            <span class="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded font-mono">
              ${percentage}% Terisi
            </span>
          </div>
          <div class="space-y-1 text-slate-300">
            <h4 class="font-bold text-white text-sm">${s.name}</h4>
            <p class="text-slate-400 text-[11px] leading-tight">${s.address}</p>
            <div class="pt-1 border-t border-slate-800 grid grid-cols-2 gap-1 text-[11px] font-mono">
              <div>Penghuni: <strong class="text-white">${s.current_occupants}</strong></div>
              <div>Kapasitas: <strong class="text-white">${s.capacity}</strong></div>
            </div>
            <div class="pt-1 text-[11px]">
              <span class="text-slate-400">PIC:</span> <strong class="text-white">${s.pic_name}</strong><br/>
              <span class="text-slate-400">Kontak:</span> <strong class="text-orange-300 font-mono">${s.pic_phone}</strong>
            </div>
            <a href="/posko?shelterId=${s.id}" class="mt-2 block text-center bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[11px] py-1 rounded transition-colors">
              Lihat Daftar Pengungsi →
            </a>
          </div>
        </div>
      `;

      const marker = L.marker([s.latitude, s.longitude], { icon }).bindPopup(popupHtml);
      layer.addLayer(marker);
    });
  }, [shelters, showShelters]);

  // Map Initialization
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [-0.7893, 108.5],
      zoom: 6,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false,
    });

    // Dark Matter basemap for high-contrast emergency visualization
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> | Data Hotspot &copy; BNPB 2026',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const clusterLayer = L.layerGroup().addTo(map);
    const shelterLayer = L.layerGroup().addTo(map);

    clusterLayerRef.current = clusterLayer;
    shelterLayerRef.current = shelterLayer;
    mapRef.current = map;

    map.on('moveend', updateClusters);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [updateClusters]);

  // Re-run clustering on data or filter change
  useEffect(() => {
    updateClusters();
  }, [updateClusters]);

  // Re-run shelter layer update
  useEffect(() => {
    updateShelters();
  }, [updateShelters]);

  // Handle Province Pan/Zoom
  const handleProvinceChange = (prov: string) => {
    setSelectedProvince(prov);
    if (mapRef.current && PROVINCE_COORDINATES[prov]) {
      const { lat, lng, zoom } = PROVINCE_COORDINATES[prov];
      mapRef.current.flyTo([lat, lng], zoom, { duration: 1.2 });
    }
  };

  return (
    <div className="relative w-full h-full min-h-[580px] flex-1 bg-slate-950 overflow-hidden">
      {/* Map DOM Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0 z-0" />

      {/* Top Floating Control Panel (Filters & Statistics) */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 max-w-sm sm:max-w-md w-full pointer-events-none">
        {/* Main Filter Glass Card */}
        <div className="bg-[#0b1220]/90 backdrop-blur-md border border-slate-800 rounded-xl p-3.5 shadow-2xl pointer-events-auto space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-orange-400" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                Filter Spasial Karhutla
              </span>
            </div>
            {/* FPS & Performance Badge */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono">
              <Gauge className="w-3 h-3 text-emerald-400" />
              <span className="text-slate-400">GIS:</span>
              <span className={`font-bold ${fps >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {fps} FPS
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Titik Aktif</span>
              <strong className="text-orange-400 text-sm">{filteredHotspots.length}</strong>
            </div>
            <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Posko Buka</span>
              <strong className="text-emerald-400 text-sm">{shelters.length}</strong>
            </div>
            <div className="bg-slate-900/80 p-1.5 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Pengungsi</span>
              <strong className="text-blue-400 text-sm">
                {shelters.reduce((acc, s) => acc + s.current_occupants, 0)}
              </strong>
            </div>
          </div>

          {/* Satellite Sensor Selector */}
          <div>
            <label className="text-[11px] text-slate-400 font-mono block mb-1">
              Sensor Satelit:
            </label>
            <div className="grid grid-cols-4 gap-1 text-[10px] font-mono">
              {['ALL', 'NASA-TERRA/AQUA', 'NASA-NOAA20', 'VIIRS'].map((sat) => (
                <button
                  key={sat}
                  onClick={() => setSelectedSatellite(sat)}
                  className={`py-1 px-1.5 rounded border text-center truncate transition-colors ${
                    selectedSatellite === sat
                      ? 'bg-orange-600 border-orange-500 text-white font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title={sat}
                >
                  {sat === 'ALL' ? 'Semua' : sat.replace('NASA-', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Province Selector */}
          <div>
            <label className="text-[11px] text-slate-400 font-mono block mb-1">
              Fokus Provinsi Prioritas:
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value="ALL">Seluruh Wilayah (Sumatera & Kalimantan)</option>
              <option value="Riau">Riau (Kampar, Pelalawan, Bengkalis)</option>
              <option value="Jambi">Jambi (Muaro Jambi, Tanjabtim)</option>
              <option value="Sumatera Selatan">Sumatera Selatan (OKI, Banyuasin)</option>
              <option value="Kalimantan Barat">Kalimantan Barat (Ketapang, Kuburaya)</option>
              <option value="Kalimantan Tengah">Kalimantan Tengah (Kotim/Sampit, Kapuas)</option>
              <option value="Kalimantan Selatan">Kalimantan Selatan (Banjar, Barito Kuala)</option>
            </select>
          </div>

          {/* Confidence Slider */}
          <div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>Filter Kepercayaan:</span>
              <strong className="text-orange-400">
                {minConfidence === 0 ? 'Semua (>0%)' : `Tinggi (≥${minConfidence}%)`}
              </strong>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              step="10"
              value={minConfidence}
              onChange={(e) => setMinConfidence(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Shelter Layer Toggle */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
            <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Layer Posko Evakuasi
            </span>
            <button
              onClick={() => setShowShelters(!showShelters)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors ${
                showShelters
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
            >
              {showShelters ? 'AKTIF' : 'NONAKTIF'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Map Legend */}
      <div className="absolute bottom-6 left-4 z-10 bg-[#0b1220]/90 backdrop-blur-md border border-slate-800 rounded-lg p-3 text-[11px] font-mono shadow-xl hidden sm:block max-w-xs">
        <h5 className="font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-orange-400" />
          Legenda Peta Spasial
        </h5>
        <div className="space-y-1.5 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-red-500 border border-white"></span>
            <span>Hotspot Tingkat Tinggi (≥80% Conf)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-orange-400 border border-white"></span>
            <span>Hotspot Tingkat Sedang (&lt;80% Conf)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-red-700 text-[9px] text-white font-bold flex items-center justify-center">
              50+
            </span>
            <span>Klaster Titik Api Padat (Supercluster)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-emerald-700 border border-emerald-300 flex items-center justify-center text-white text-[9px]">
              🛡️
            </span>
            <span>Posko Evakuasi Resmi BNPB (A/B/C)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
