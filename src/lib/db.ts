import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Shelter, Evacuee, MissingReport, Hotspot, AirQualityStation, CorporateConcession } from '@/types';
import {
  INITIAL_SHELTERS,
  INITIAL_EVACUEES,
  INITIAL_MISSING_REPORTS,
  INITIAL_AQI_STATIONS,
  INITIAL_CORPORATE_CONCESSIONS
} from './seeds';
import hotspotsData from '@/data/hotspots_bnpb_2026.json';

interface DatabaseSchema {
  shelters: Shelter[];
  evacuees: Evacuee[];
  missing_reports: MissingReport[];
  aqi_stations: AirQualityStation[];
  corporate_concessions: CorporateConcession[];
  auth: {
    password_salt: string;
    password_hash: string;
  };
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
// Salted scrypt hash fallback (no plaintext password stored in repository)
const FALLBACK_AUTH = {
  password_salt: '08a29a8fb4a597cdd502235e992089b2',
  password_hash:
    '5a55c12af90a62dc821696bede23a2af0af6eb1c10f8d055d2511edb9bad9a874325480c0691fdf97824609fa01008ad5c6bf1df89d22a29d4e097447c64a0e9',
};

function initDatabase(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      // Ensure new tables are seeded if not present
      if (!parsed.aqi_stations) parsed.aqi_stations = INITIAL_AQI_STATIONS;
      if (!parsed.corporate_concessions) parsed.corporate_concessions = INITIAL_CORPORATE_CONCESSIONS;
      if (!parsed.auth?.password_hash || !parsed.auth?.password_salt) {
        parsed.auth = { ...FALLBACK_AUTH };
      }
      return parsed;
    } catch (e) {
      console.error('Error reading db.json, falling back to initial data', e);
    }
  }

  const initialData: DatabaseSchema = {
    shelters: INITIAL_SHELTERS,
    evacuees: INITIAL_EVACUEES,
    missing_reports: INITIAL_MISSING_REPORTS,
    aqi_stations: INITIAL_AQI_STATIONS,
    corporate_concessions: INITIAL_CORPORATE_CONCESSIONS,
    auth: { ...FALLBACK_AUTH },
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  return initialData;
}

let dbInstance: DatabaseSchema | null = null;

function getDb(): DatabaseSchema {
  if (!dbInstance) {
    dbInstance = initDatabase();
  }
  return dbInstance;
}

function saveDb(): void {
  if (dbInstance) {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(dbInstance, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  }
}

// ==================== SHELTERS ====================
export function getAllShelters(): Shelter[] {
  return getDb().shelters;
}

export function getShelterById(id: number): Shelter | undefined {
  return getDb().shelters.find((s) => s.id === id);
}

// ==================== EVACUEES ====================
export function getAllEvacuees(): Evacuee[] {
  return getDb().evacuees;
}

export function searchEvacuees(query: string, shelterId?: number): Evacuee[] {
  const db = getDb();
  const q = query.trim().toLowerCase();

  return db.evacuees.filter((e) => {
    const matchesQuery =
      !q ||
      e.full_name.toLowerCase().includes(q) ||
      e.origin_village.toLowerCase().includes(q) ||
      (e.shelter_name && e.shelter_name.toLowerCase().includes(q));

    const matchesShelter = shelterId ? e.shelter_id === shelterId : true;
    return matchesQuery && matchesShelter;
  });
}

export function addEvacuee(data: Omit<Evacuee, 'id' | 'admitted_at' | 'updated_at'>): Evacuee {
  const db = getDb();
  const newId = db.evacuees.length > 0 ? Math.max(...db.evacuees.map((e) => e.id)) + 1 : 1;
  const now = new Date().toISOString();
  
  const shelter = db.shelters.find((s) => s.id === data.shelter_id);
  const shelter_name = shelter ? shelter.name : data.shelter_name || 'Posko Tidak Diketahui';

  const newEvacuee: Evacuee = {
    ...data,
    id: newId,
    shelter_name,
    admitted_at: now,
    updated_at: now,
  };

  db.evacuees.unshift(newEvacuee);

  if (shelter) {
    shelter.current_occupants += 1;
  }

  saveDb();
  return newEvacuee;
}

// ==================== MISSING REPORTS ====================
export function getAllReports(status?: string): MissingReport[] {
  const db = getDb();
  if (!status) return db.missing_reports;
  return db.missing_reports.filter((r) => r.status === status);
}

export function getReportByTicket(ticketCode: string): MissingReport | undefined {
  const db = getDb();
  return db.missing_reports.find((r) => r.ticket_code.toUpperCase() === ticketCode.toUpperCase());
}

export function createMissingReport(data: {
  reporter_name: string;
  reporter_phone: string;
  victim_name: string;
  victim_age: number;
  last_seen_location: string;
  description: string;
}): MissingReport {
  const db = getDb();
  const newId = db.missing_reports.length > 0 ? Math.max(...db.missing_reports.map((r) => r.id)) + 1 : 1;
  
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ticket_code = `TKT-2026-${randomSuffix}`;

  const newReport: MissingReport = {
    id: newId,
    ticket_code,
    reporter_name: data.reporter_name,
    reporter_phone: data.reporter_phone,
    victim_name: data.victim_name,
    victim_age: data.victim_age,
    last_seen_location: data.last_seen_location,
    description: data.description,
    status: 'PENDING_VERIFICATION',
    reported_at: new Date().toISOString(),
    verified_at: null,
  };

  db.missing_reports.unshift(newReport);
  saveDb();
  return newReport;
}

export function updateReportStatus(
  id: number,
  status: MissingReport['status'],
  options?: {
    matched_shelter_id?: number;
    officer_notes?: string;
  }
): MissingReport | null {
  const db = getDb();
  const report = db.missing_reports.find((r) => r.id === id);
  if (!report) return null;

  report.status = status;
  report.verified_at = new Date().toISOString();

  if (options?.matched_shelter_id) {
    report.matched_shelter_id = options.matched_shelter_id;
    const shelter = db.shelters.find((s) => s.id === options.matched_shelter_id);
    report.matched_shelter_name = shelter ? shelter.name : null;

    if (status === 'FOUND_AT_SHELTER') {
      const alreadyIn = db.evacuees.some(
        (e) => e.full_name.toLowerCase() === report.victim_name.toLowerCase() && e.shelter_id === options.matched_shelter_id
      );
      if (!alreadyIn) {
        addEvacuee({
          shelter_id: options.matched_shelter_id,
          shelter_name: report.matched_shelter_name || undefined,
          full_name: report.victim_name,
          age: report.victim_age,
          gender: 'Laki-laki',
          origin_village: report.last_seen_location,
          health_condition: 'Sehat',
          notes: `Ditemukan melalui tiket ${report.ticket_code}. Catatan: ${options.officer_notes || 'Telah dievakuasi ke posko.'}`,
        });
      }
    }
  }

  if (options?.officer_notes !== undefined) {
    report.officer_notes = options.officer_notes;
  }

  saveDb();
  return report;
}

// ==================== HOTSPOTS ====================
export function getHotspots(filter?: {
  satellite?: string;
  province?: string;
  minConfidence?: number;
}): Hotspot[] {
  let list = (hotspotsData as Hotspot[]);

  if (filter?.satellite && filter.satellite !== 'ALL') {
    list = list.filter((h) => h.satellite === filter.satellite);
  }
  if (filter?.province && filter.province !== 'ALL') {
    list = list.filter((h) => h.province === filter.province);
  }
  if (filter?.minConfidence !== undefined) {
    const minConf = filter.minConfidence;
    list = list.filter((h) => h.confidence >= minConf);
  }

  return list;
}

// ==================== KARHUTLA.CLOUD FEATURES ====================
export function getAirQualityStations(): AirQualityStation[] {
  const db = getDb();
  return db.aqi_stations || INITIAL_AQI_STATIONS;
}

export function getCorporateConcessions(): CorporateConcession[] {
  const db = getDb();
  return db.corporate_concessions || INITIAL_CORPORATE_CONCESSIONS;
}

// ==================== AUTH ====================
export function verifySharedPassword(password: string): boolean {
  const envPassword = process.env.OFFICER_PASSWORD;
  if (envPassword) {
    const a = Buffer.from(password, 'utf8');
    const b = Buffer.from(envPassword, 'utf8');
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  }

  const db = getDb();
  const salt = db.auth?.password_salt || FALLBACK_AUTH.password_salt;
  const expectedHash = db.auth?.password_hash || FALLBACK_AUTH.password_hash;

  const derived = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHash, 'hex');
  return derived.length === expected.length && crypto.timingSafeEqual(derived, expected);
}
