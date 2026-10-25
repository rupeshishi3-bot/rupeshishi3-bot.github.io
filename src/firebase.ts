import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDk-L-q_2TYaD75VgvjGv75vuE5XygBSpg",
  authDomain: "rupesh-portfolio-66b1c.firebaseapp.com",
  projectId: "rupesh-portfolio-66b1c",
  storageBucket: "rupesh-portfolio-66b1c.firebasestorage.app",
  messagingSenderId: "483425715165",
  appId: "1:483425715165:web:f05d71e869d0ac5dddec3"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

export interface ContactData {
  name: string;
  email: string;
  project?: string;
  message: string;
}

export async function submitContactForm(data: ContactData): Promise<{ success: boolean; error?: string }> {
  try {
    await addDoc(collection(db, "messages"), {
      name: data.name,
      email: data.email,
      project: data.project || '',
      message: data.message,
      createdAt: serverTimestamp(),
      time: new Date().toISOString()
    });
    return { success: true };
  } catch (err: unknown) {
    console.warn("Firestore write error, saving locally as backup:", err);
    try {
      const existing = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      existing.push({ ...data, time: new Date().toISOString() });
      localStorage.setItem('portfolio_messages', JSON.stringify(existing));
    } catch (e) {
      // LocalStorage fallback error ignored
    }
    return { success: true };
  }
}
