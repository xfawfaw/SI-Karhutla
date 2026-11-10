import fs from 'fs';
import path from 'path';

const PROVINCE_CONFIGS = [
  {
    province: 'Riau',
    regencies: ['Kampar', 'Pelalawan', 'Bengkalis', 'Rokan Hilir', 'Indragiri Hilir', 'Siak', 'Dumai'],
    latRange: [0.0, 1.8],
    lngRange: [100.3, 103.2],
    count: 550,
  },
  {
    province: 'Jambi',
    regencies: ['Muaro Jambi', 'Tanjung Jabung Timur', 'Tanjung Jabung Barat', 'Sarolangun'],
    latRange: [-2.4, -0.9],
    lngRange: [102.8, 104.4],
    count: 320,
  },
  {
    province: 'Sumatera Selatan',
    regencies: ['Ogan Komering Ilir', 'Musi Banyuasin', 'Banyuasin', 'Muara Enim'],
    latRange: [-4.2, -2.1],
    lngRange: [103.5, 105.8],
    count: 480,
  },
  {
    province: 'Kalimantan Barat',
    regencies: ['Ketapang', 'Kuburaya', 'Mempawah', 'Sambas', 'Sanggau'],
    latRange: [-2.5, 1.2],
    lngRange: [109.0, 111.8],
    count: 350,
  },
  {
    province: 'Kalimantan Tengah',
    regencies: ['Kotawaringin Timur', 'Kapuas', 'Pulang Pisau', 'Katingan', 'Seruyan'],
    latRange: [-3.3, -1.2],
    lngRange: [111.5, 114.5],
    count: 450,
  },
  {
    province: 'Kalimantan Selatan',
    regencies: ['Banjar', 'Barito Kuala', 'Tanah Laut', 'Tapin'],
    latRange: [-3.9, -2.6],
    lngRange: [114.3, 115.8],
    count: 250,
  },
];

const SATELLITES = ['NASA-TERRA/AQUA', 'NASA-NOAA20', 'VIIRS'];

function randomFloat(min, max, decimals = 4) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const hotspots = [];
let id = 1;

for (const cfg of PROVINCE_CONFIGS) {
  for (let i = 0; i < cfg.count; i++) {
    // Generate some clusters around sub-centers
    const isCluster = Math.random() > 0.4;
    let lat, lng;

    if (isCluster) {
      // Pick a localized cluster center
      const centerLat = (cfg.latRange[0] + cfg.latRange[1]) / 2 + (Math.random() - 0.5) * (cfg.latRange[1] - cfg.latRange[0]) * 0.7;
      const centerLng = (cfg.lngRange[0] + cfg.lngRange[1]) / 2 + (Math.random() - 0.5) * (cfg.lngRange[1] - cfg.lngRange[0]) * 0.7;
      lat = randomFloat(centerLat - 0.15, centerLat + 0.15);
      lng = randomFloat(centerLng - 0.18, centerLng + 0.18);
    } else {
      lat = randomFloat(cfg.latRange[0], cfg.latRange[1]);
      lng = randomFloat(cfg.lngRange[0], cfg.lngRange[1]);
    }

    const satellite = randomChoice(SATELLITES);
    const regency = randomChoice(cfg.regencies);
    
    // Confidence distribution: 40% high (>80%), 40% nominal (60-80%), 20% low/medium
    const confidence = Math.random() > 0.35 
      ? Math.floor(Math.random() * 19 + 81) // 81-99%
      : Math.floor(Math.random() * 25 + 55); // 55-79%

    const brightness = randomFloat(310.5, 385.2, 1);

    // Days in Aug-Sept 2026
    const day = Math.floor(Math.random() * 15 + 20); // 20 - 34 -> August 20 - Sept 04
    const month = day > 31 ? '09' : '08';
    const dayStr = String(day > 31 ? day - 31 : day).padStart(2, '0');
    const acquisition_date = `2026-${month}-${dayStr}`;

    const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const acquisition_time = `${hour}:${minute}:00`;

    hotspots.push({
      id: id++,
      latitude: lat,
      longitude: lng,
      brightness,
      confidence,
      satellite,
      province: cfg.province,
      regency,
      acquisition_date,
      acquisition_time,
    });
  }
}

const outDir = path.resolve('src/data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outPath = path.join(outDir, 'hotspots_bnpb_2026.json');
fs.writeFileSync(outPath, JSON.stringify(hotspots, null, 2), 'utf-8');
console.log(`Generated ${hotspots.length} realistic BNPB 2026 hotspots at ${outPath}`);
