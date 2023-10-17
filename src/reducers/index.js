import { combineReducers } from "redux";

import auth from "reducers/auth";
import citiesIndex from "reducers/citiesIndex";
import selectedCity from "reducers/selectedCity";
import selectedCountry from "reducers/selectedCountry";
import reviews from "reducers/reviews";

const serviceApp = combineReducers({
  auth,
  citiesIndex,
  selectedCity,
  selectedCountry,
  reviews
});

export default serviceApp;
