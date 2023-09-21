import * as api from "api";
import { set, onDisconnect } from "firebase/database";

export const checkUserConnection = (uid) => {
  const userStatusDatabaseRef = api.createFirebaseRef("status", uid);

  api.onConnectionChanged((isConnected) => {
    if (!isConnected) {
      set(userStatusDatabaseRef, api.isOfflineForDatabase);
      return null;
    }

    onDisconnect(userStatusDatabaseRef)
      .set(api.isOfflineForDatabase)
      .then((_) => set(userStatusDatabaseRef, api.isOnlineForDatabase));
  });
};
