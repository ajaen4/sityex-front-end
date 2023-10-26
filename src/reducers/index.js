import { combineReducers } from "redux";

import auth from "reducers/auth";
import citiesIndex from "reducers/citiesIndex";
import selectedCity from "reducers/selectedCity";
import selectedCountry from "reducers/selectedCountry";
import places from "reducers/places";

const serviceApp = combineReducers({
  auth,
  citiesIndex,
  selectedCity,
  selectedCountry,
  places
});

export default serviceApp;
