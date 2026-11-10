export interface Shelter {
  id: number;
  code: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity: number;
  current_occupants: number;
  pic_name: string;
  pic_phone: string;
  created_at: string;
}

export type HealthCondition = 
  | 'Sehat'
  | 'Kelelahan Ringan'
  | 'Luka Ringan'
  | 'Gangguan Saluran Pernapasan (ISPA Ringan)'
  | 'Gangguan Saluran Pernapasan (ISPA Berat)'
  | 'Perawatan Intensif';

export interface Evacuee {
  id: number;
  shelter_id: number;
  shelter_name?: string;
  full_name: string;
  age: number;
  gender: 'Laki-laki' | 'Perempuan';
  origin_village: string;
  health_condition: HealthCondition;
  notes: string;
  admitted_at: string;
  updated_at: string;
}

export type ReportStatus = 
  | 'PENDING_VERIFICATION'
  | 'VERIFIED_MISSING'
  | 'FOUND_AT_SHELTER'
  | 'REJECTED';

export interface MissingReport {
  id: number;
  ticket_code: string;
  reporter_name: string;
  reporter_phone: string;
  victim_name: string;
  victim_age: number;
  last_seen_location: string;
  description: string;
  status: ReportStatus;
  matched_shelter_id?: number | null;
  matched_shelter_name?: string | null;
  officer_notes?: string;
  reported_at: string;
  verified_at?: string | null;
}

export interface Hotspot {
  id: number;
  latitude: number;
  longitude: number;
  brightness: number;
  confidence: number;
  satellite: 'NASA-TERRA/AQUA' | 'NASA-NOAA20' | 'VIIRS';
  province: 'Riau' | 'Jambi' | 'Sumatera Selatan' | 'Kalimantan Barat' | 'Kalimantan Tengah' | 'Kalimantan Selatan';
  regency: string;
  acquisition_date: string;
  acquisition_time: string;
}

export interface UserSession {
  username: string;
  role: 'OFFICER' | 'ADMIN';
  shelter_id?: number;
  shelter_name?: string;
}
