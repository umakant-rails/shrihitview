import {
  USER_LOGIN,
  USER_REGISTRATION,
  ERROR_HANDLING
} from "../utils/types";

const stateObj = {currentUser: {}};

const authReducer = (state=stateObj, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {...state, 
        user: action.payload.user, 
        token: action.payload.token,
        message: action.payload.message,
        statusCode: action.payload.statusCode
      };
    case USER_REGISTRATION:
      return {
        ...state, 
        message: action.payload.message,
        statusCode: action.payload.statusCode
      }
    case ERROR_HANDLING:
      return{
        ...state,
        message: action.payload.message,
        statusCode: action.payload.statusCode
      }
    default: 
      return state
  }
};

export default authReducer;