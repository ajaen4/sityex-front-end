import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  signInWithRedirect,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";

import db, { auth } from "baas";

export const googleProvider = new GoogleAuthProvider();

export const logIn = async ({ email, password }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (!user.emailVerified) {
      throw new Error("Please verify your email before logging in.");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logInWithGoogle = async () => {
  try {
    signInWithRedirect(auth, googleProvider);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const onAuthStateChangedCallback = (onAuthCallback) =>
  onAuthStateChanged(auth, onAuthCallback);

export const createUser = async ({
  email,
  password,
  userName,
  homeCountry3Code,
}) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await sendEmailVerification(user);
    await saveUser({
      uid: user.uid,
      email,
      userName,
      homeCountry3Code,
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const saveUser = async (userData) => {
  const userRef = doc(db, "users", userData.uid);
  getDoc(userRef).then((docSnap) => {
    if (docSnap.exists()) {
      setDoc(
        userRef,
        {
          userName: userData.userName,
          email: userData.email,
          photoURL: userData.photoURL || null,
        },
        { merge: true },
      );
    } else {
      setDoc(userRef, {
        userName: userData.userName,
        email: userData.email,
        id: userData.uid,
        homeCountry3Code: userData.homeCountry3Code || null,
        photoURL: userData.photoURL || null,
      });
    }
  });
};

export const updateUser = async (userData) => {
  const userRef = doc(db, "users", userData.id);
  await setDoc(userRef, userData, { merge: true });
};

export const getUserData = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  return snapshot.data();
};

export const signOutUser = () => signOut(auth);

export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

export const updatePasswordUser = (password) => {
  if (auth.currentUser) {
    return updatePassword(auth.currentUser, password);
  }
  throw new Error("No authenticated user");
};
