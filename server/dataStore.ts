import fs from 'fs';
import path from 'path';
import { UserProfile, UserInteraction } from '../src/types.js';

const DATA_DIR = path.join(process.cwd(), '.data');
const PROFILES_FILE = path.join(DATA_DIR, 'profiles.json');
const INTERACTIONS_FILE = path.join(DATA_DIR, 'interactions.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.warn('Could not create .data directory, running in-memory', e);
  }
}

// In-memory caches with file persistence
let profiles: Record<string, UserProfile> = {};
let interactions: UserInteraction[] = [];

try {
  if (fs.existsSync(PROFILES_FILE)) {
    profiles = JSON.parse(fs.readFileSync(PROFILES_FILE, 'utf-8'));
  }
} catch (e) {
  profiles = {};
}

try {
  if (fs.existsSync(INTERACTIONS_FILE)) {
    interactions = JSON.parse(fs.readFileSync(INTERACTIONS_FILE, 'utf-8'));
  }
} catch (e) {
  interactions = [];
}

function persistProfiles() {
  try {
    fs.writeFileSync(PROFILES_FILE, JSON.stringify(profiles, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Error saving profiles to disk', e);
  }
}

function persistInteractions() {
  try {
    fs.writeFileSync(INTERACTIONS_FILE, JSON.stringify(interactions.slice(-1000), null, 2), 'utf-8');
  } catch (e) {
    console.warn('Error saving interactions to disk', e);
  }
}

export const DataStore = {
  getProfile(userId: string): UserProfile | null {
    return profiles[userId] || null;
  },

  saveProfile(profile: UserProfile): UserProfile {
    profile.updatedAt = new Date().toISOString();
    profiles[profile.id] = profile;
    persistProfiles();
    return profile;
  },

  createDefaultProfile(userId: string): UserProfile {
    const defaultProfile: UserProfile = {
      id: userId,
      ageGroup: 'adult',
      interests: ['history', 'architecture', 'culture'],
      expertiseLevel: 'enthusiast',
      availableTime: 'half_day',
      mobilityNeed: 'none',
      language: 'en',
      budgetTier: 'moderate',
      travelGroup: 'solo',
      preferredTransport: 'any',
      indoorOutdoorPref: 'all',
      personalizationEnabled: true,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    profiles[userId] = defaultProfile;
    persistProfiles();
    return defaultProfile;
  },

  addInteraction(interaction: UserInteraction): void {
    interactions.push(interaction);
    persistInteractions();
  },

  getUserInteractions(userId: string): UserInteraction[] {
    return interactions.filter(i => i.userId === userId);
  }
};
