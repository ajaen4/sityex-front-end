import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  limit,
  where,
  startAfter,
  orderBy,
} from "firebase/firestore";
import db from "baas";

import { housingPageSize } from "constants/constants";

export const getHousingPage = async (city_id, lastVisibleDocId, orderByV) => {
  try {
    const housingCol = collection(db, "cities", city_id, "housing");

    let orderF = null;
    if (orderByV === "rank") {
      orderF = orderBy("rank");
    } else if (orderByV === "price") {
      orderF = orderBy("costs.price");
    } else {
      orderF = orderBy("housing_id");
    }

    let q = null;
    if (lastVisibleDocId) {
      const lastVisibleDocRef = doc(
        db,
        "cities",
        city_id,
        "housing",
        lastVisibleDocId
      );
      const lastVisibleDoc = await getDoc(lastVisibleDocRef);
      q = query(
        housingCol,
        orderF,
        startAfter(lastVisibleDoc),
        limit(housingPageSize)
      );
    } else {
      q = query(housingCol, orderF, limit(housingPageSize));
    }

    const housingDocs = await getDocs(q);
    return housingDocs.docs.map((doc) => doc.data());
  } catch (err) {
    console.error("Error fetching housing listings:", err);
    return err;
  }
};

export const getHousingListing = async (city_id, housing_id) => {
  try {
    const housingDoc = await getDoc(
      doc(collection(db, "cities", city_id, "housing"), housing_id)
    );
    if (!housingDoc.exists()) {
      console.log("No such document ", housing_id, " in collection cities!");
      return {};
    } else {
      return housingDoc.data();
    }
  } catch (err) {
    console.error("Error fetching housing listing:", err);
    return err;
  }
};

export const getHousingIndex = async (city_id) => {
  try {
    const document_name = "index";
    const indexDoc = await getDoc(
      doc(collection(db, "cities", city_id, "housing_index"), document_name)
    );
    if (!indexDoc.exists()) {
      console.log(
        "No such document " + document_name + " in collection housing!"
      );
      return {};
    } else {
      return indexDoc.data();
    }
  } catch (err) {
    console.error("Error fetching housing index:", err);
    return err;
  }
};
