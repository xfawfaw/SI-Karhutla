'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
import Supercluster from 'supercluster';
import { Hotspot, Shelter } from '@/types';
import { Shield, Filter, MapPin, Layers } from 'lucide-react';

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

  // Fast cluster rendering with Neobrutalist markers
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

        const size = count > 100 ? 46 : count > 30 ? 38 : 32;
        const bgColor = count > 100 ? '#eb3b5a' : count > 30 ? '#ff5722' : '#ffde59';
        const textColor = count > 30 ? '#ffffff' : '#000000';

        const icon = L.divIcon({
          html: `<div class="custom-cluster-marker" style="width:${size}px; height:${size}px; background:${bgColor}; color:${textColor}; font-size:${size > 36 ? 13 : 11}px; font-weight:900;">
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
          color: '#000000',
          weight: 1.5,
          opacity: 1,
          fillOpacity: 0.9,
        });

        circle.bindPopup(`
          <div style="padding:12px; font-family: monospace; font-size:12px; line-height:1.4; color:#000000; background:#ffffff;">
            <div style="font-weight:900; background:#ff5722; color:#ffffff; padding:2px 6px; border:2px solid #000; display:inline-block; margin-bottom:6px; font-size:11px;">
              🔥 HOTSPOT ${h.confidence}% CONF
            </div>
            <div><strong>Wilayah:</strong> ${h.regency}, ${h.province}</div>
            <div><strong>Satelit:</strong> ${h.satellite}</div>
            <div><strong>Kecerahan:</strong> ${h.brightness} K</div>
            <div><strong>Waktu:</strong> ${h.acquisition_date} ${h.acquisition_time}</div>
            <div style="margin-top:4px; font-size:11px; color:#555;">[${lat.toFixed(4)}, ${lng.toFixed(4)}]</div>
          </div>
        `);

        clusterLayer.addLayer(circle);
      }
    });
  }, [superclusterIndex]);

  // Render Shelter Layer with Neobrutalism badge
  const renderShelters = useCallback(() => {
    const layer = shelterLayerRef.current;
    if (!layer) return;
    layer.clearLayers();

    if (!showShelters) return;

    shelters.forEach((s) => {
      const occRatio = Math.round((s.current_occupants / s.capacity) * 100);

      const icon = L.divIcon({
        html: `
          <div style="width:34px; height:34px; border-radius:4px; background:#20bf6b; border:2.5px solid #000000; box-shadow:3px 3px 0px #000000; display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
        `,
        className: '',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      const popup = `
        <div style="padding:12px; font-family: monospace; font-size:12px; line-height:1.4; color:#000000; background:#ffffff;">
          <div style="font-weight:900; background:#20bf6b; color:#000000; border:2px solid #000; padding:2px 6px; display:inline-block; font-size:12px; margin-bottom:4px;">
            🛡️ ${s.code}: ${s.name}
          </div>
          <div style="color:#444; font-size:11px; margin-bottom:6px;">${s.address}</div>
          <div style="font-weight:bold; margin-bottom:4px;">Keterisian: ${s.current_occupants} / ${s.capacity} Jiwa (${occRatio}%)</div>
          <div><strong>PIC:</strong> ${s.pic_name} (${s.pic_phone})</div>
          <a href="/posko?shelterId=${s.id}" style="display:inline-block; margin-top:8px; padding:6px 10px; background:#ffde59; color:#000000; border:2px solid #000000; box-shadow:2px 2px 0px #000; text-decoration:none; font-size:11px; font-weight:900;">
            LIHAT MANIFES PENGUNGSI →
          </a>
        </div>
      `;

      const marker = L.marker([s.latitude, s.longitude], { icon }).bindPopup(popup);
      layer.addLayer(marker);
    });
  }, [shelters, showShelters]);

  // Initial Leaflet Map Setup (Free clean OpenStreetMap tile layer, ZERO watermarks!)
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

    // 100% Free OpenStreetMap Tile Layer - NO API KEY, NO WATERMARK!
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
    <div className="relative w-full h-[600px] border-3 sm:border-4 border-black bg-[#e5e2da] overflow-hidden shadow-brutal-lg">
      {/* Map DOM Mount */}
      <div
        ref={mapContainerRef}
        id="leaflet-gis-map"
        className="w-full h-full"
        style={{ minHeight: '600px', width: '100%', height: '100%' }}
      />

      {/* Neobrutalist Floating Control Dock */}
      <div className="absolute top-3 left-3 right-3 sm:right-auto sm:left-4 z-10 pointer-events-none">
        <div className="bg-[#ffffff] border-2 sm:border-3 border-black p-2.5 sm:p-3 shadow-brutal pointer-events-auto flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
          {/* Active Points Count Sticker */}
          <div className="bg-[#ff5722] text-white font-bold px-2.5 py-1 border-2 border-black shadow-brutal-sm flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
            <span>{filteredHotspots.length} HOTSPOTS</span>
          </div>

          {/* Satellite Selector */}
          <div className="flex items-center gap-1 bg-[#f4f0e8] px-2 py-1 border-2 border-black">
            <span className="font-bold text-black">SAT:</span>
            <select
              value={selectedSatellite}
              onChange={(e) => setSelectedSatellite(e.target.value)}
              className="bg-transparent font-bold text-black focus:outline-none cursor-pointer"
            >
              <option value="ALL">SEMUA SENSOR</option>
              <option value="NASA-TERRA/AQUA">TERRA / AQUA</option>
              <option value="NASA-NOAA20">NOAA20</option>
              <option value="VIIRS">VIIRS</option>
            </select>
          </div>

          {/* Province Focus */}
          <div className="flex items-center gap-1 bg-[#f4f0e8] px-2 py-1 border-2 border-black">
            <span className="font-bold text-black">WILAYAH:</span>
            <select
              value={selectedProvince}
              onChange={(e) => handleProvinceSelect(e.target.value)}
              className="bg-transparent font-bold text-black focus:outline-none cursor-pointer"
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
            className={`px-2.5 py-1 font-bold border-2 border-black transition-all brutal-btn ${
              minConfidence > 0 ? 'bg-[#eb3b5a] text-white' : 'bg-white text-black'
            }`}
          >
            {minConfidence > 0 ? '🔥 TINGGI (≥80%)' : 'SEMUA TINGKAT'}
          </button>

          {/* Shelter Layer Toggle */}
          <button
            onClick={() => setShowShelters(!showShelters)}
            className={`flex items-center gap-1 px-2.5 py-1 font-bold border-2 border-black transition-all brutal-btn ${
              showShelters ? 'bg-[#20bf6b] text-black' : 'bg-white text-slate-400'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            POSKO ({shelters.length})
          </button>
        </div>
      </div>

      {/* Neobrutalist Legend Bottom-Left */}
      <div className="absolute bottom-4 left-4 z-10 bg-[#ffffff] border-2 border-black p-2 shadow-brutal font-mono text-[11px] font-bold hidden sm:flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-[#eb3b5a] border border-black inline-block"></span>
          <span>≥80% Sangat Rawan</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-[#ff5722] border border-black inline-block"></span>
          <span>Sedang</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-[#ffde59] border border-black inline-block"></span>
          <span>Klaster Api</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 bg-[#20bf6b] border border-black inline-block"></span>
          <span>Posko Evakuasi</span>
        </div>
      </div>
    </div>
  );
}
