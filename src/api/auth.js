import firebase from 'firebase/app'
import 'firebase/auth'

import db from 'db'

export const logIn = async ({email, password}) => {
  try{
    const resp = await firebase.auth().signInWithEmailAndPassword(email, password)
    const { user } = resp
    return Promise.resolve(user)
  }
  catch (error) {
    return Promise.reject(error.message)
  }
}

export const onAuthStateChanged = (onAuthCallback) => firebase.auth().onAuthStateChanged(onAuthCallback)

export const createUser = async ({email, password, userName}) => {
  try{
    const resp = await firebase.auth().createUserWithEmailAndPassword(email, password)
    const { user } = resp
    await saveUser({uid: user.uid, email, userName})
    return Promise.resolve(user)
  }
  catch (error) {
    return Promise.reject(error.message)
  }
}

export const saveUser = (userData) => {
  db.collection("users")
  .doc(userData.uid)
  .set({
    userName: userData.userName,
    email: userData.email,
    id: userData.uid
  })
}

export const getUserData = (uid) =>
  db.collection("users")
  .doc(uid)
  .get()
  .then(snapshot => snapshot.data())

export const signOut = () => firebase.auth().signOut()

//Sends and email to reset the password
export const resetPassword = email => firebase.auth().sendPasswordResetEmail(email)

export const updatePassword = password => firebase.auth().currentUser.updatePassword(password)
