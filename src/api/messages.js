import db from "db";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

export const subscribeToMessages = (userId, callback) => {
  const messagesCol = collection(db, "users", userId, "messages");

  return onSnapshot(messagesCol, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages);
  });
};

export const sendConnectionRequest = async (userData, type) => {
  const messagesCol = collection(db, "users", userData.toUserId, "messages");

  const message = {
    message: `El usuario ${userData.fromUserName} quiere conectar contigo`,
    fromUserId: userData.fromUserId,
    type: type,
  };

  const docRef = await addDoc(messagesCol, message);
  return { ...message, id: docRef.id };
};
