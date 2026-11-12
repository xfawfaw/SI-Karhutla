import React from 'react';
import HeroSection from '@/components/hero/HeroSection';
import MapSection from '@/components/map/MapSection';
import EvacueeSearchSection from '@/components/evacuees/EvacueeSearchSection';
import AqiSection from '@/components/aqi/AqiSection';
import EducationSection from '@/components/education/EducationSection';
import ConcessionsSection from '@/components/concessions/ConcessionsSection';
import {
  getHotspots,
  getAllShelters,
  getAllEvacuees,
  getAirQualityStations,
  getCorporateConcessions,
} from '@/lib/db';

export default function HomePage() {
  const hotspots = getHotspots();
  const shelters = getAllShelters();
  const evacuees = getAllEvacuees();
  const aqiStations = getAirQualityStations();
  const corporateConcessions = getCorporateConcessions();

  const totalOccupants = shelters.reduce((acc, s) => acc + s.current_occupants, 0);
  const totalCapacity = shelters.reduce((acc, s) => acc + s.capacity, 0);

  return (
    <div className="flex flex-col flex-1 bg-[#f5f2eb] text-[#121212]">
      {/* 1. Dynamic Hero Section (Muse Group Aesthetic + Tactile Highlight + Parallax Scroll) */}
      <HeroSection totalOccupants={totalOccupants} totalCapacity={totalCapacity} />

      {/* 2. Interactive Hotspot Geoportal Map (#peta) - 60 FPS Supercluster & Scroll Animated */}
      <MapSection hotspots={hotspots} shelters={shelters} />

      {/* 3. Section: Korban & Posko Evakuasi Interactive Directory (#posko) - Open Broadsheet Architecture */}
      <div className="bg-[#fbf9f4] transition-colors duration-500">
        <EvacueeSearchSection initialEvacuees={evacuees} shelters={shelters} />
      </div>

      {/* 4. Section: Indeks Kualitas Udara (US EPA AQI - from karhutla.cloud) (#aqi) - Scroll Animated */}
      <AqiSection aqiStations={aqiStations} />

      {/* 5. Section: EDUKASI & MITIGASI KARHUTLA (#edukasi / #mitigasi) - Rujukan UU 24/2007 & Scroll Animated */}
      <EducationSection />

      {/* 6. Section: Transparansi Konsesi Korporasi (#konsesi) - Open Broadsheet Divider Layout */}
      <ConcessionsSection corporateConcessions={corporateConcessions} />
    </div>
  );
}
