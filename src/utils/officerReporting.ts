// utils/officerReporting.ts
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {  app } from "./firebaseConfig";

const db = getFirestore(app);
const auth = getAuth(app);

/**
 * Fetch all unassigned reports (status === "pending")
 */

export const fetchUnassignedReports = async () => {
  const reportsRef = collection(db, "violationReports");
  const q = query(reportsRef, where("status", "==", "pending"));
  const querySnapshot = await getDocs(q);

  const reports = querySnapshot.docs.map(doc => {
    const data = doc.data();
    const dateTimeStr = data.dateTime || "";
    const [date, time] = dateTimeStr.split("T"); // "2025-05-21T08:26" => ["2025-05-21", "08:26"]

    return {
      id: doc.id,
      title: data.title || "",
      location: data.location || "",
      date: date || "",
      time: time || "",
      category: data.category || "",
      status: data.status || "pending",
      image: data.mediaUrl || "/images/default-complaint.png"
    };
  });

  return reports;
};


/**
 * Claim a report by updating its status and assigning it to the current officer.
 */
export const claimReport = async (reportId: string): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const reportRef = doc(db, 'violationReports', reportId);

  await updateDoc(reportRef, {
    status: 'under review',
    claimedBy: user.uid, // Officer's UID
    claimedAt: new Date().toISOString(), // Optional for tracking
  });
};

/**
 * Fetch all reports assigned to the currently logged-in officer.
 */
export const fetchOfficerReports = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const reportsRef = collection(db, "violationReports");
  const q = query(reportsRef, where("claimedBy", "==", user.uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || "",
      location: data.location || "",
      date: data.date || "",
      time: data.time || "",
      category: data.category || "",
      status: formatStatus(data.status || "pending"),
      image: data.mediaUrl || "/images/default-complaint.png",
    };
  });
};

// Capitalize and normalize Firestore status
const formatStatus = (
  status: string
): "pending" | "under review" | "verified" | "rejected" => {
  const map: Record<string, any> = {
    pending: "pending",
    "under review": "under review",
    verified: "verified",
    rejected: "rejected",
  };
  return map[status.toLowerCase()] || "pending";
};


export const getReportById = async (id: string) => {
  const docRef = doc(db, "violationReports", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Report not found");
  }
};

export const updateReportStatus = async (reportId: string, newStatus: string) => {
  const reportRef = doc(db, "violationReports", reportId);
  await updateDoc(reportRef, {
    status: newStatus,
    updatedAt: new Date().toISOString(),
  });
};