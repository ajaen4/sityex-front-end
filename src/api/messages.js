
import db from 'db'

export const subscribeToMessages = (userId, callback) =>
  db.collection("users")
    .doc(userId)
    .collection("messages")
    .onSnapshot(snapshot => {
      const messages = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      callback(messages)
    }
  )

export const sendConnectionRequest = (userData, type) => {

  const messagesRef = db.collection("users").doc(userData.toUserId).collection("messages")

  const ref = messagesRef.doc()
  const docId = ref.path.split("/").pop()

  const message = {id: docId, message: "El usuario " + userData.fromUserName + " quiere conectar contigo", fromUserId: userData.fromUserId, type: type}

  return messagesRef.doc(docId).set(message)
}
