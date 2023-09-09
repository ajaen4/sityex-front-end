import { getDatabase, ref, onValue, serverTimestamp } from 'firebase/database';

const database = getDatabase();

export const createFirebaseRef = (collection, id) => ref(database, `/${collection}/${id}`);

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: serverTimestamp()
};

export const isOnlineForDatabase = {
  state: 'online',
  last_changed: serverTimestamp()
};

export const onConnectionChanged = callback => {
  const connectionRef = ref(database, '.info/connected');
  onValue(connectionRef, snapshot => {
    callback(snapshot.val());
  });
};
