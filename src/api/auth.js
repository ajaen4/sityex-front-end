import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";

import db from "db";

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const logIn = async ({ email, password }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logInWithGoogle = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      return result.user;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export const onAuthStateChangedCallback = (onAuthCallback) =>
  onAuthStateChanged(auth, onAuthCallback);

export const createUser = async ({ email, password, userName }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await saveUser({ uid: user.uid, email, userName });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const saveUser = async (userData) => {
  const userRef = doc(db, "users", userData.uid);
  await setDoc(userRef, {
    userName: userData.userName,
    email: userData.email,
    id: userData.uid,
  });
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
