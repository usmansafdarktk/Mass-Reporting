import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  getDoc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "./firebaseConfig";

import { Report } from "../components/ReportCard"; 

const db = getFirestore(app);
const auth = getAuth(app);


/**
 * Submit a violation report to Firestore with a Cloudinary media URL.
 */
export const submitViolationReport = async ({
  title,
  description,
  category,
  dateTime,
  location,
  mediaUrl,
}: {
  title: string;
  description: string;
  category: string;
  dateTime: string;
  location: string;
  mediaUrl: string;
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const userId = user.uid;

  const docRef = await addDoc(collection(db, "violationReports"), {
    userId,
    title,
    description,
    category,
    dateTime,
    location,
    mediaUrl,
    status: "pending",
    createdAt: Timestamp.now(),
  });

  return docRef.id;
};

/**
 * Fetch all violation reports submitted by the current user.
 */
export const getUserViolationReports = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const q = query(
    collection(db, "violationReports"),
    where("userId", "==", user.uid)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};


/**
 * Fetch a single violation report by ID, adapted to match ReportCard interface.
 */
export const getReportById = async (reportId: string): Promise<Report> => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const reportRef = doc(db, "violationReports", reportId);
  const reportSnap = await getDoc(reportRef);

  if (!reportSnap.exists()) throw new Error("Report not found");

  const data = reportSnap.data();

  return {
    id: reportSnap.id,
    title: data.title,
    category: data.category,
    description: data.description,
    location: data.location,
    date: new Date(data.dateTime).toISOString().split("T")[0], // converted for date input
    status: data.status,
    imagePath: data.mediaUrl, // mapped field
  };
};


/**
 * Update an existing violation report by ID.
 */
export const updateViolationReport = async (
  reportId: string,
  updatedFields: Partial<{
    title: string;
    description: string;
    category: string;
    dateTime: string;
    location: string;
    mediaUrl: string;
    status: string;
  }>
) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const reportRef = doc(db, "violationReports", reportId);
  await updateDoc(reportRef, updatedFields);
};

/**
 * Delete a specific violation report by ID.
 */
export const deleteViolationReport = async (reportId: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const reportRef = doc(db, "violationReports", reportId);
  await deleteDoc(reportRef);
};
