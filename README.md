# SI-KARHUTLA Cloud (2026)

Geoportal Spasial Titik Panas, Indeks Kualitas Udara (AQI), Direktori Posko Evakuasi, dan Sistem Pelaporan Bencana Kebakaran Hutan & Lahan (Karhutla) Indonesia.

> **Project Based Build — Kelompok 6**  
> Mata Kuliah Sistem Informasi Manajemen Bencana (SIMB)  
> Program Studi Sistem Informasi, Fakultas Teknik Industri  
> **Universitas Pembangunan Nasional "Veteran" Yogyakarta**

---

## Anggota Tim (Kelompok 6)

| Nama | NIM |
| :--- | :--- |
| Makfiy Ahmad Hamizan | `124250145` |
| Muammar Ghazy Syafrudin | `124250133` |
| Farel Paul Jhogi Silalahi | `124250132` |
| Bintang Fergiawan | `124250143` |

---

## Fitur Utama

1. **Peta Sebaran Titik Panas GIS (`/`)**
   - Visualisasi peta OpenStreetMap dengan **Leaflet** dan klasterisasi spasial **Supercluster** (*60 FPS*).
   - Filter berdasarkan sensor satelit (`NASA-TERRA/AQUA`, `NASA-NOAA20`, `VIIRS`), wilayah provinsi prioritas, tingkat kepercayaan (*confidence* $\ge 80\%$), serta layer Posko Evakuasi.
2. **Direktori Posko & Reuni Pengungsi (`/#posko`, `/posko`)**
   - Pemantauan kapasitas dan keterisian Posko A, B, dan C secara *real-time*.
   - Pencarian cepat daftar penyintas/pengungsi beserta kondisi medis dan catatan posko.
3. **Pelaporan Orang Hilang (`/lapor`)**
   - Formulir pelaporan publik mandiri dengan pembuatan kode tiket unik untuk pelacakan status verifikasi.
4. **Portal Petugas (`/petugas`)**
   - Halaman terotentikasi untuk verifikasi laporan orang hilang, pembaruan status, dan pencocokan dengan posko pengungsian.
5. **Indeks Kualitas Udara / AQI (`/#aqi`)**
   - Pemantauan stasiun kualitas udara (US EPA AQI & PM2.5) beserta rekomendasi kesehatan per wilayah terdampak.
6. **Edukasi Mitigasi & Konsesi Korporasi (`/#mitigasi`, `/mitigasi`, `/#konsesi`)**
   - Informasi regulasi penanggulangan bencana (UU No. 24 Tahun 2007), mitigasi karhutla gambut, serta pemantauan konsesi korporasi dan asas *strict liability*.

---

## Teknologi yang Digunakan

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Bahasa:** TypeScript & React 19
- **Styling & Animasi:** Tailwind CSS, Framer Motion, Lucide React
- **Pemetaan Spasial:** Leaflet & Supercluster
- **Backend / API:** Next.js Route Handlers (`/api/hotspots`, `/api/shelters`, `/api/evacuees`, `/api/reports`, `/api/aqi`, `/api/concessions`, `/api/auth`)

---

## Menjalankan Proyek Secara Lokal

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Build untuk produksi
npm run build
npm start
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat aplikasi.
