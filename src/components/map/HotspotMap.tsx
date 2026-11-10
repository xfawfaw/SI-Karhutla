'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Hotspot, Shelter } from '@/types';
import { Loader2 } from 'lucide-react';

const DynamicMap = dynamic(() => import('./MapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[580px] bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-400">
      <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      <span className="font-mono text-sm tracking-wide">
        Menginisialisasi Leaflet Canvas & Supercluster GIS Engine...
      </span>
    </div>
  ),
});

interface HotspotMapProps {
  hotspots: Hotspot[];
  shelters: Shelter[];
}

export default function HotspotMap(props: HotspotMapProps) {
  return <DynamicMap {...props} />;
}
