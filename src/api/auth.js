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
  sendEmailVerification,
  FacebookAuthProvider
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";

import db from "db";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

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
    const { user } = await signInWithPopup(auth, googleProvider);
    await saveUser({
      uid: user.uid,
      email: user.email,
      userName: user.displayName,
      photoURL: user.photoURL
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logInWithFacebook = async () => {
  signInWithPopup(auth, facebookProvider)
    .then(async (result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);

      await saveUser({
        uid: user.uid,
        email: user.email,
        userName: user.displayName
      });
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
      throw new Error(errorMessage);
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
    await sendEmailVerification(user);
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
    photoURL: userData.photoURL || null
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
