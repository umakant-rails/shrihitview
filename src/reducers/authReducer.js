import {
  USER_LOGOUT,
  USER_REGISTRATION,
  ERROR_HANDLING,
  PASSWORD_UPDATED,
  PASSWORD_TOKEN_VARIFIED,
  PASSWORD_TOKEN_SENT,
  PASSWORD_UPDATED_BY_TOKEN,
  USER_ACCOUNT_CONFIRMED
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
        registeredUser: action.payload.user,
      }
    case PASSWORD_UPDATED:
      return {
        password_changed: true
      }
    case PASSWORD_TOKEN_SENT:
      return {
        password_token_sent: true
      }
    case PASSWORD_TOKEN_VARIFIED:
      return {
        password_token_varified: true
      }
    case PASSWORD_UPDATED_BY_TOKEN:
      return {
        password_updated_by_token: true
      }
    case USER_ACCOUNT_CONFIRMED:
      return {
        account_confirmed: true
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