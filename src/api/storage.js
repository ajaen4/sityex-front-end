import { storage } from "db";

import { ref, getDownloadURL } from "firebase/storage";

export const getQRCode = async (city_id) => {
  const cityQRRef = ref(storage, `whatsapp_community_qrs/${city_id}.png`);
  const url = await getDownloadURL(cityQRRef);
  return url;
};
