import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration - Shared with main project
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase app (avoid re-initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Firebase collections for car parts project
export const COLLECTIONS = {
  // User related (shared with main project)
  USERS: 'users',
  VENDORS: 'vendors',
  
  // Car parts specific collections
  PARTS: 'car_parts',
  PARTS_CATEGORIES: 'parts_categories',
  PARTS_ORDERS: 'parts_orders',
  PARTS_REVIEWS: 'parts_reviews',
  PARTS_INQUIRIES: 'parts_inquiries',
  
  // System collections
  SETTINGS: 'settings',
  ANALYTICS: 'analytics',
} as const;

// Car makes/models data structure
export const CAR_MAKES = [
  'Toyota', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen',
  'Opel', 'Ford', 'Renault', 'Peugeot', 'Citroen',
  'Skoda', 'Seat', 'Hyundai', 'Kia', 'Nissan',
  'Honda', 'Mazda', 'Mitsubishi', 'Suzuki', 'Subaru',
  'Volvo', 'Saab', 'Fiat', 'Alfa Romeo', 'Lancia'
] as const;

// Part categories following mobile.de structure
export const PART_CATEGORIES = [
  'engine',
  'transmission', 
  'brakes',
  'suspension',
  'electrical',
  'body',
  'interior',
  'exhaust',
  'cooling',
  'fuel'
] as const;

export default app;