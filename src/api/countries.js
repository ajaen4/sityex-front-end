import { collection, doc, getDoc } from "firebase/firestore";
import db from "db";

export const getCountry = async (country_3_code) => {
  try {
    const countryDoc = await getDoc(
      doc(collection(db, "countries"), country_3_code)
    );
    if (!countryDoc.exists()) {
      console.log(
        "No such document ",
        country_3_code,
        " in collection cities!"
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
