import { combineReducers } from "redux";

import auth from "reducers/auth";
import citiesIndex from "reducers/citiesIndex";
import selectedCity from "reducers/selectedCity";
import selectedCountry from "reducers/selectedCountry";
import places from "reducers/places";
import allCountries from "reducers/allCountries";
import events from "reducers/events";

const serviceApp = combineReducers({
  auth,
  citiesIndex,
  selectedCity,
  selectedCountry,
  allCountries,
  places,
  events
});

export default serviceApp;
