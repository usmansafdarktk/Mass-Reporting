import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword,
  UserCredential, } from "firebase/auth";
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
  designation?: string // 👈 Optional designation for Officer
): Promise<void> => {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Set display name in Firebase Auth
    await updateProfile(user, { displayName: name });

    // Build user data
    const userData: any = {
      uid: user.uid,
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    };

    if (role === 'Officer') {
      userData.phoneNumber = phoneNumber;
      userData.organization = organization;
      if (designation) {
        userData.designation = designation; // ✅ Store designation separately
      }
    }

    // Save to Firestore
    await setDoc(doc(db, "users", user.uid), userData);
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
