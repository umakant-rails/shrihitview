import {
  PB_CONTEXT_LIST,
  PB_CONTEXT_SHOW,
  } from "../../utils/types";
  
  const initialState = {contexts: []};
  const contextReducer = (state=initialState, action) => {
      switch (action.type) {
      case PB_CONTEXT_LIST:
        return {
          ...state,
          contexts: action.payload.contexts,
        };
      case PB_CONTEXT_SHOW:
        return {
          ...state,
          context: action.payload.context,
        };
      default: 
        return state
      }
  };
  
  export default contextReducer;