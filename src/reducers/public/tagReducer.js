import {
    TAG_LIST,
    TAG_SHOW,
  } from "../../utils/types";
  
  const initialState = {tags: []};
  const tagReducer = (state=initialState, action) => {
      switch (action.type) {
      case TAG_LIST:
        return {
          ...state,
          tags: action.payload.tags,
        };
      case TAG_SHOW:
        return {
          ...state,
          tag: action.payload.tag,
        };
      default: 
        return state
      }
  };
  
  export default tagReducer;