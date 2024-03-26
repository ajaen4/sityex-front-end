import { combineReducers } from "redux";

import auth from "store/reducers/auth";
import citiesIndex from "store/reducers/citiesIndex";
import selectedCity from "store/reducers/selectedCity";
import events from "store/reducers/events";
import housing from "store/reducers/housing";

const rootReducer = combineReducers({
  auth,
  citiesIndex,
  selectedCity,
  events,
  housing,
});

export default rootReducer;
