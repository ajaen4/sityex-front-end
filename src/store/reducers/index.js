import { combineReducers } from "redux";

import auth from "store/reducers/auth";
import citiesIndex from "store/reducers/citiesIndex";
import selectedCity from "store/reducers/selectedCity";
import selectedCountry from "store/reducers/selectedCountry";
import allCountries from "store/reducers/allCountries";
import events from "store/reducers/events";

const rootReducer = combineReducers({
  auth,
  citiesIndex,
  selectedCity,
  selectedCountry,
  allCountries,
  events,
});

export default rootReducer;