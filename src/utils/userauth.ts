import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword,
  UserCredential, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc,  getDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * Sign up user and save additional info in Firestore
 */
export const signUpUser = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  phoneNumber: string,
  role: 'Citizen' | 'Officer',
  organization: string,
  designation?: string,
  cnic?: string
): Promise<void> => {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    // Base user data saved in 'users' collection
    const userData: any = {
      uid: user.uid,
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "users", user.uid), userData);

    // Save to citizens or officers collection
    if (role === "Citizen") {
      const citizenData = {
        name,
        email,
      };
      await setDoc(doc(db, "citizens", user.uid), citizenData);
    }

    if (role === "Officer") {
      const officerData = {
        name,
        email,
        phone: phoneNumber,
        cnic: cnic || "",
        role: designation || "", // designation saved in 'role' field
        organization,
        profileImage: "/images/user-profile.png",
      };
      await setDoc(doc(db, "officers", user.uid), officerData);
    }

  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * Sign in a user with email and password, and retrieve user info from Firestore.
 */
export const signInUser = async (
  email: string,
  password: string
): Promise<{ uid: string; role: string; name: string } | null> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Get user data from Firestore
    const userDocRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      throw new Error("User data not found in Firestore.");
    }

    const userData = userSnapshot.data();
    return {
      uid,
      role: userData.role,
      name: userData.name,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully.");
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

/**
 * Get current user's citizen profile
 */
export const getCitizenProfile = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const docRef = doc(db, "citizens", user.uid);
  const docSnap = await getDoc(docRef);

  const firestoreData = docSnap.exists() ? docSnap.data() : {};
  const authData = {
    fullName: user.displayName || "",
    email: user.email || "",
  };

  return {
    profileImage: "/images/user-profile.png", // fallback image
    ...authData,
    ...firestoreData, // will override if same fields exist
  };
};

/**
 * Update or create citizen profile
 */
export const updateCitizenProfile = async (data: any) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const docRef = doc(db, "citizens", user.uid);
  await setDoc(docRef, data, { merge: true });
};


/**
 * Get current officer's profile from 'officers' collection
 */
export const getOfficerProfile = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const docRef = doc(db, "officers", user.uid);
  const docSnap = await getDoc(docRef);

  const authData = {
    fullName: user.displayName || "",
    email: user.email || "",
  };

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      profileImage: data.profileImage || "/images/user-profile.png",
      ...authData,
      ...data, // Firestore values will override auth data if they exist
    };
  }

  return {
    ...authData,
    phone: "",
    cnic: "",
    department: "",
    role: "",
    organization: "",
    profileImage: "/images/user-profile.png",
  };
};


/**
 * Update or create officer profile in 'officers' collection
 */
export const updateOfficerProfile = async (data: any) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const ref = doc(db, "officers", user.uid);
  await setDoc(ref, data, { merge: true });
};
