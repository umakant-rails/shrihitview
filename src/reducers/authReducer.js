import {
  USER_LOGOUT,
  USER_REGISTRATION,
  ERROR_HANDLING,
  PASSWORD_UPDATED
} from "../utils/types";

const stateObj = {currentUser: {}};

const authReducer = (state=stateObj, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return {
        user: null, 
        token: null,
        message: action.payload.message,
        statusCode: action.payload.statusCode,
        isLoggedIn: false
      };
    case USER_REGISTRATION:
      return { 
        isRegistered: action.payload.user,
      }
    case PASSWORD_UPDATED:
      return {
        password_changed: action.payload.password_changed
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