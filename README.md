<div align="center">

# 🔥 SI-KARHUTLA CLOUD (2026)
### Geoportal Spasial Titik Panas, Indeks AQI, Direktori Posko & Portal Kedaruratan Karhutla

[![Next.js](https://img.shields.io/badge/Next.js-16.4.6_Turbopack-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet GIS](https://img.shields.io/badge/Leaflet-GIS_Engine-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Smooth_14-f08c00?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Status Bencana](https://img.shields.io/badge/Status-SIAGA_1_DARURAT-dc5645?style=for-the-badge&logo=fire&logoColor=white)](#)

<br/>

<p align="center">
  <a href="https://sikarhutla.vercel.app">
    <img src="https://img.shields.io/badge/🚀_LIVE_PRODUCTION-sikarhutla.vercel.app-dc5645?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <a href="tel:117">
    <img src="https://img.shields.io/badge/📞_HOTLINE_BNPB-117-e6a73c?style=for-the-badge&logo=phone&logoColor=121212" alt="BNPB Hotline" />
  </a>
</p>

> **Project Based Build — Tugas Besar Kelompok 6**  
> Mata Kuliah: **Sistem Informasi Manajemen Bencana (SIMB)**  
> Dosen Pengampu: **Herry Sofyan, S.T., M.Kom.**  
> Program Studi Sistem Informasi • Fakultas Teknik Industri  
> **Universitas Pembangunan Nasional "Veteran" Yogyakarta** • 2026

</div>

---

## 👥 Profil Anggota Pengembang (Kelompok 6)

Urutan anggota tim disusun secara berurutan berdasarkan **Nomor Induk Mahasiswa (NIM 124250132 – 124250145)**:

<div align="center">

| No | Pas Foto / Profil | Nama Lengkap | NIM | Peran Utama |
| :---: | :---: | :--- | :---: | :--- |
| **01** | 👨‍💻 | **Farel Paul Jhogi Silalahi** | `124250132` | **Fullstack GIS & Database Architect** |
| **02** | 👨‍💻 | **Muammar Ghazy Syafrudin** | `124250133` | **Spatial Telemetry & Frontend Engineer** |
| **03** | 👨‍💻 | **Bintang Fergiawan** | `124250143` | **Disaster Management & Mitigasi Research** |
| **04** | 👨‍💻 | **Makfiy Ahmad Hamizan** | `124250145` | **UI/UX Interaction & Verification Flow** |

</div>

---

## 🌐 Arsitektur Sistem Kedaruratan (SIM Bencana)

```mermaid
flowchart TD
    subgraph SENSOR["🛰️ TELEMETRI SATELIT & SENSOR (LIVE)"]
        S1["NASA-TERRA / AQUA"]
        S2["NASA-NOAA20"]
        S3["Sensor VIIRS (375m)"]
        S4["Stasiun ISPU / AQI PM2.5"]
    end

    subgraph CORE["⚡ SI-KARHUTLA ENGINE (NEXT.JS 16)"]
        GIS["Leaflet Canvas + Supercluster (60 FPS)"]
        DB[("Database Relasional: Shelters, Evacuees, Reports, Concessions")]
        API["REST Route Handlers (/api/*)"]
    end

    subgraph ACTORS["👥 PENGGUNA SISTEM KEBENCANAAN"]
        PUBLIK["Warga Publik / Korban"]
        PETUGAS["Satgas Manggala Agni / Petugas BNPB"]
        GAKKUM["KemenLHK & Auditor Konsesi"]
    end

    SENSOR --> GIS
    SENSOR --> API
    API <--> DB
    GIS <--> API

    PUBLIK -->|"Lapor Orang Hilang / Pantau AQI"| CORE
    CORE -->|"Pencarian Reuni Pengungsi Posko"| PUBLIK
    PETUGAS -->|"Verifikasi Tiket & Validasi Lapangan"| CORE
    GAKKUM -->|"Audit Anomali Konsesi Sawit/HTI"| CORE
```

---

## ✨ Fitur-Fitur Utama Platform

<details open>
<summary><b>🔥 1. Geoportal Spasial Titik Panas (Hotspot GIS 60 FPS)</b></summary>
<br/>

- **Mesin Spasial Cepat:** Didukung algoritma *Supercluster Canvas* yang mampu merender ribuan titik anomali termal NASA & NOAA tanpa lag.
- **Filter Multi-Kriteria:** Filter interaktif berdasarkan jenis sensor satelit, provinsi prioritas (*Riau, Jambi, Sumsel, Kalbar, Kalteng, Kalsel*), dan tingkat kepercayaan (*confidence $\ge 80\%$*).
- **Layer Posko Terpadu:** Menampilkan sebaran posko evakuasi dengan pin pelindung interaktif dan detail kapasitas.

</details>

<details>
<summary><b>🛡️ 2. Direktori Posko & Reuni Keluarga Pengungsi</b></summary>
<br/>

- **Live Capacity Bar:** Indikator persentase keterisian posko evakuasi (Posko A Rimbo Panjang, Posko B Minas Jaya, Posko C Danau Bingkuang).
- **Pencarian Kerabat Instan:** Fasilitas pencarian data warga terevakuasi, kondisi kesehatan medis (*Sehat, Kelelahan, ISPA Ringan, ISPA Berat, Perawatan Intensif*), asal desa, dan kontak darurat PIC resmi posko.

</details>

<details>
<summary><b>🎫 3. Tiket Pengaduan Publik Mandiri (`/lapor`)</b></summary>
<br/>

- **Formulir Laporan Terbuka:** Masyarakat dapat menerbitkan laporan orang hilang akibat karhutla secara cepat.
- **Kode Tiket Instan:** Setiap laporan menghasilkan kode unik (contoh: `LAPOR-2026-9812`) untuk memudahkan pelacakan status tanpa perlu login.

</details>

<details>
<summary><b>🔐 4. Portal Petugas Verifikator Lapangan (`/petugas`)</b></summary>
<br/>

- **Autentikasi Terproteksi:** Portal khusus bagi petugas BNPB dan Satgas Posko.
- **Pencocokan Otomatis (*Matching Engine*):** Memverifikasi aduan korban hilang langsung ke daftar manifes pengungsi posko dengan status: `PENDING_VERIFICATION`, `VERIFIED_MISSING`, atau `FOUND_AT_SHELTER`.

</details>

<details>
<summary><b>🌬️ 5. Telemetri Kualitas Udara (Indeks US EPA AQI & PM2.5)</b></summary>
<br/>

- **Pemantauan Real-Time:** Stasiun pemantau AQI dari Pekanbaru, Palembang, Jambi, Pontianak, Palangka Raya, hingga Banjarmasin.
- **Panduan Medis Tanggap Bencana:** Kategori bahaya kualitas udara (*Baik, Sedang, Tidak Sehat, Berbahaya*) lengkap dengan protokol masker respirator N95/P100 dan evakuasi balita/lansia.

</details>

<details>
<summary><b>📜 6. Ensiklopedia Mitigasi Karhutla & Audit Konsesi Korporasi</b></summary>
<br/>

- **Pustaka Mitigasi Kebencanaan:** Panduan regulasi UU No. 24 Tahun 2007, studi ilmiah siklus ekologis gambut, dan mitigasi sekat kanal (*canal blocking*).
- **Transparansi Konsesi:** Pemantauan titik panas pada konsesi perkebunan kelapa sawit dan HTI dengan penegakan asas pertanggungjawaban mutlak (*strict liability*).

</details>

---

## 🛠️ Stack Teknologi

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | High-performance fullstack framework dengan Turbopack |
| **Language** | TypeScript 5.8 | Strict type-safety untuk entitas kebencanaan |
| **User Interface** | React 19 + Tailwind CSS | Desain *Swiss Editorial Broadsheet* bebas distraksi |
| **Motion Engine** | Framer Motion 14 | Animasi *scroll-driven*, *parallax*, dan *tactile hover* |
| **GIS & Mapping** | Leaflet 1.9 + Supercluster | Peta interaktif OpenStreetMap bebas watermark |
| **Icons & Typography** | Lucide React + PP Right Grotesk | Tipografi berkarakter editorial jurnalistik |
| **Storage & API** | Next.js Route Handlers + JSON DB | RESTful Endpoints (`/api/*`) dengan schema validation |

---

## 🔌 Dokumentasi REST API

| Method | Endpoint | Deskripsi Fungsi |
| :---: | :--- | :--- |
| `GET` | `/api/hotspots` | Mengambil seluruh titik panas satelit aktif NASA/NOAA |
| `GET` | `/api/shelters` | Mengambil daftar posko evakuasi & kapasitas terkini |
| `GET` | `/api/evacuees` | Mengambil data penyintas/korban yang dievakuasi di posko |
| `GET` | `/api/reports` | Mengambil daftar tiket laporan orang hilang |
| `POST` | `/api/reports` | Mengirimkan laporan pengaduan korban hilang baru |
| `PATCH` | `/api/reports/[id]` | Memperbarui status verifikasi laporan oleh petugas posko |
| `GET` | `/api/aqi` | Mengambil indeks kualitas udara US EPA AQI & PM2.5 |
| `GET` | `/api/concessions`| Mengambil data konsesi korporasi & anomali titik api |
| `POST` | `/api/auth` | Verifikasi kredensial akses Portal Petugas Lapangan |

---

## 🚀 Panduan Menjalankan Sistem (Lokal)

### Prasyarat
- **Node.js** versi `v18.17.0` atau yang lebih baru
- Package manager `npm`, `pnpm`, atau `yarn`

### Langkah Instalasi
```bash
# 1. Clone repositori ini
git clone https://github.com/xfawfaw/SI-Karhutla.git

# 2. Masuk ke direktori proyek
cd SI-Karhutla

# 3. Pasang semua dependensi
npm install

# 4. Jalankan mode pengembangan (development)
npm run dev
```

Buka peramban Anda di **[http://localhost:3000](http://localhost:3000)**.

### Build untuk Produksi
```bash
# Kompilasi aplikasi dengan Turbopack
npm run build

# Menjalankan server produksi
npm start
```

---

<div align="center">

**SI-KARHUTLA Cloud (2026)**  
*Project Based Build By Kelompok 6 SIMB UPN "Veteran" Yogyakarta*  
Standardisasi BNPB 2026 • Rujukan UU No. 24 Tahun 2007

</div>
