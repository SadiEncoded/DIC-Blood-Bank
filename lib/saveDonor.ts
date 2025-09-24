import { addDoc, collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface DonorData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  bloodGroup: string;
  dob: string; // ISO string
  gender: string;
  lastDonation: string; // ISO string
  weight: string;
  notes: string;
}

export async function saveDonor(data: DonorData) {
  if (!data.fullName || !data.email || !data.bloodGroup) {
    return { success: false, error: "Full name, email, and blood group are required." };
  }

  try {
    const docRef = await addDoc(collection(db, "donors"), {
      ...data,
      dob: Timestamp.fromDate(new Date(data.dob)),
      lastDonation: Timestamp.fromDate(new Date(data.lastDonation)),
      createdAt: serverTimestamp(),
      status: "active",
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding donor:", error);
    return { success: false, error };
  }
}
