import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "./firebaseConfig";

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
  mediaUrl
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
