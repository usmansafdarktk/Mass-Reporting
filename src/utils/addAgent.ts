// utils/addagent.ts
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from './firebaseConfig';

const db = getFirestore(app);
const auth = getAuth(app);

/**
 * Add/register a new officer from Admin Panel
 * - Creates user with temporary password
 * - Sends reset link for officer to set their own password
 * - Saves to both 'users' and 'officers' collections
 */
export const addOfficer = async (
  name: string,
  email: string,
  phoneNumber: string,
  organization: string,
  designation: string,
  cnic: string
): Promise<void> => {
  try {
    // Step 1: Create account with dummy password
    const tempPassword = 'Temporary123!';
    const userCredential = await createUserWithEmailAndPassword(auth, email, tempPassword);
    const user = userCredential.user;

    // Step 2: Set display name
    await updateProfile(user, { displayName: name });

    // Step 3: Save to 'users' collection
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      email,
      role: 'Officer',
      createdAt: new Date().toISOString(),
    });

    // Step 4: Save full officer profile
    await setDoc(doc(db, 'officers', user.uid), {
      name,
      email,
      phone: phoneNumber,
      cnic,
      role: designation, // Note: storing 'designation' as 'role'
      organization,
      profileImage: '/images/user-profile.png',
    });

    // Step 5: Send password reset email
    await sendPasswordResetEmail(auth, email);

  } catch (error: any) {
    throw new Error(error.message || 'Failed to add officer.');
  }
};
