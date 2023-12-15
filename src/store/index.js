import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "store/reducers";
import logger from "redux-logger";

export const makeStore = () => {
  const middleware = (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      process.env.NODE_ENV !== "production" ? logger : [],
    );

  return configureStore({
    reducer: rootReducer,
    middleware,
  });
};
