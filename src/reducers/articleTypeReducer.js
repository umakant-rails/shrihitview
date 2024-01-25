import {
    ARTICLE_TYPE_LIST,
    ARTICLE_TYPE_SHOW,
  } from "../utils/types";
  
  const initialState = {article_types: []};
  const articleTypeReducer = (state=initialState, action) => {
      switch (action.type) {
      case ARTICLE_TYPE_LIST:
        return {
          ...state,
          article_types: action.payload.article_types,
        };
      case ARTICLE_TYPE_SHOW:
        return {
          ...state,
          article_type: action.payload.article_type,
        };
      default: 
        return state
      }
  };
  
  export default articleTypeReducer;