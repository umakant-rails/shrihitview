import {
  USER_LOGOUT,
  USER_REGISTRATION,
  ERROR_HANDLING
} from "../../utils/types";

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
        isRegistered: true,
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