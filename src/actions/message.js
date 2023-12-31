import { SET_MESSAGE, CLEAR_MESSAGE } from "../utils/types";

export const setMessage = (type, message) => ({
  type: SET_MESSAGE,
  msg_type: type,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});