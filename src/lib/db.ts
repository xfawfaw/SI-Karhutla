import fs from 'fs';
import path from 'path';
import { Shelter, Evacuee, MissingReport, Hotspot } from '@/types';
import { INITIAL_SHELTERS, INITIAL_EVACUEES, INITIAL_MISSING_REPORTS } from './seeds';
import hotspotsData from '@/data/hotspots_bnpb_2026.json';

interface DatabaseSchema {
  shelters: Shelter[];
  evacuees: Evacuee[];
  missing_reports: MissingReport[];
  auth: {
    shared_password_hash: string;
    token_secret: string;
  };
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Default shared password for emergency field officers: 'poskosiaga2026'
const DEFAULT_PASSWORD = 'poskosiaga2026';

function initDatabase(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading db.json, falling back to initial data', e);
    }
  }

  const initialData: DatabaseSchema = {
    shelters: INITIAL_SHELTERS,
    evacuees: INITIAL_EVACUEES,
    missing_reports: INITIAL_MISSING_REPORTS,
    auth: {
      shared_password_hash: DEFAULT_PASSWORD,
      token_secret: 'si-karhutla-emergency-token-2026',
    },
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  return initialData;
}

// In-memory cache + persistent write-through
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

  // Increment shelter occupants
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
  
  // Generate ticket code e.g. TKT-2026-XXXX
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

    // If marked as FOUND_AT_SHELTER, check if victim is already in evacuees; if not, auto-admit them
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
          gender: 'Laki-laki', // Default or unassigned
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

// ==================== AUTH ====================
export function verifySharedPassword(password: string): boolean {
  const db = getDb();
  return password === db.auth.shared_password_hash || password === DEFAULT_PASSWORD;
}
