import {
    CONTEXT_LIST,
    CONTEXT_SHOW,
  } from "../../utils/types";
  
  const initialState = {contexts: []};
  const contextReducer = (state=initialState, action) => {
      switch (action.type) {
      case CONTEXT_LIST:
        return {
          ...state,
          contexts: action.payload.contexts,
        };
      case CONTEXT_SHOW:
        return {
          ...state,
          context: action.payload.context,
        };
      default: 
        return state
      }
  };
  
  export default contextReducer;