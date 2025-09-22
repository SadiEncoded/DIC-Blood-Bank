import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function saveDonor(data: any) {
  try {
    await addDoc(collection(db, "donors"), {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      bloodGroup: data.bloodGroup,
      dob: data.dob,
      gender: data.gender,
      lastDonation: data.lastDonation,
      weight: data.weight,
      notes: data.notes,
      createdAt: serverTimestamp(),
      status: "active"
    });
    return { success: true };
  } catch (error) {
    console.error("Error adding donor:", error);
    return { success: false, error };
  }
}
