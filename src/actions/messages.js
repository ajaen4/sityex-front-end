import * as api from "api";

import { FETCH_USER_MESSAGES_SUCCESS } from "types";

export const subscribeToMessages = (userId) => (dispatch) =>
  api.subscribeToMessages(userId, (messages) =>
    dispatch({ type: FETCH_USER_MESSAGES_SUCCESS, messages: messages }),
  );

export const sendConnectionRequest = (userData, type) =>
  api.sendConnectionRequest(userData, type);
