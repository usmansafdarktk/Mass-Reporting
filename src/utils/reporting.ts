import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { app } from "./firebaseConfig";

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

/**
 * Upload media file (image or video) to Firebase Storage and return the public URL.
 */
export const uploadMediaFile = async (file: File, userId: string): Promise<string> => {
  const filePath = `reports/${userId}/${Date.now()}_${file.name}`;
  const fileRef = ref(storage, filePath);
  await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(fileRef);
  return downloadURL;
};

/**
 * Submit a violation report to Firestore.
 */
export const submitViolationReport = async ({
  title,
  description,
  category,
  dateTime,
  location,
  mediaFile
}: {
  title: string;
  description: string;
  category: string;
  dateTime: string;
  location: string;
  mediaFile: File | null;
}) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const userId = user.uid;
  let mediaURL = "";

  if (mediaFile) {
    mediaURL = await uploadMediaFile(mediaFile, userId);
  }

  const docRef = await addDoc(collection(db, "violationReports"), {
    userId,
    title,
    description,
    category,
    dateTime,
    location,
    mediaURL,
    status: "pending",
    createdAt: Timestamp.now(),
  });

  return docRef.id;
};
