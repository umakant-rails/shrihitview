import { SET_MESSAGE, CLEAR_MESSAGE } from "../utils/types";

const initialState = {};

const msgReducer = (state = initialState, action) => {
  const { type, msg_type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { type: msg_type, message: payload };
    case CLEAR_MESSAGE:
      return { message: "" };
    default:
      return state;
  }
}

export default msgReducer;