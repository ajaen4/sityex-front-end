import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import db from "baas";

export const getCountry = async (country_3_code) => {
  try {
    const countryDoc = await getDoc(
      doc(collection(db, "countries"), country_3_code),
    );
    if (!countryDoc.exists()) {
      console.log(
        "No such document ",
        country_3_code,
        " in collection cities!",
      );
      return {};
    } else {
      return countryDoc.data();
    }
  } catch (err) {
    console.error("Error fetching country:", err);
    return err;
  }
};

export const getCountries = async () => {
  try {
    const countriesCol = collection(db, "countries");
    const q = query(countriesCol, orderBy("name"));
    const countriesDocs = await getDocs(q);
    const countriesData = countriesDocs.docs.map((doc) => doc.data());
    return countriesData;
  } catch (err) {
    console.error("Error fetching countries:", err);
    return [];
  }
};
