// utils/agentManagement.ts
import { getFirestore, collection, getDocs, query, where, doc, getDoc, deleteDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

const db = getFirestore(app);

/**
 * Fetch all officers (agents) from Firestore.
 */
export const fetchAllAgents = async () => {
  const snapshot = await getDocs(collection(db, "officers"));
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      imagePath: data.profileImage || "/images/user-profile.png",
      name: data.name || "Unnamed Officer",
      rank: data.role || "Unknown Rank",
      department: data.organization || "Unknown Department",
      contactInfo: `Phone: ${data.phone || "N/A"} | Email: ${data.email || "N/A"}`,
      bio: data.bio || "No bio provided.",
      totalComplaints: 0, // Optional: Set actual values if available
      complaintsStatus: {
        open: 0,
        inProgress: 0,
        resolved: 0,
      },
    };
  });
};

/**
 * Fetch complaints stats for a specific officer based on UID
 */
export const getOfficerComplaintStats = async (officerUid: string) => {
  const reportsRef = collection(db, "violationReports");
  const q = query(reportsRef, where("claimedBy", "==", officerUid));
  const snapshot = await getDocs(q);

  let open = 0, inProgress = 0, resolved = 0;

  snapshot.forEach((doc) => {
    const status = (doc.data().status || "").toLowerCase();
    if (status === "pending") open++;
    else if (status === "under review") inProgress++;
    else if (status === "verified") resolved++;
  });

  return {
    totalComplaints: snapshot.size,
    complaintsStatus: {
      open,
      inProgress,
      resolved,
    },
  };
};


/**
 * Fetch a single officer's profile by ID
 */
export const getOfficerById = async (id: string) => {
  const ref = doc(db, "officers", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Agent not found");
  return { id, ...snap.data() };
};


/**
 * Deletes an officer (agent) from both 'users' and 'officers' collections
 */
export const deleteAgent = async (uid: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "officers", uid));
    await deleteDoc(doc(db, "users", uid));
  } catch (error) {
    console.error("Error deleting agent:", error);
    throw new Error("Failed to delete agent");
  }
};
