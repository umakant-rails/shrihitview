import {
  AUTHOR_LIST,
  AUTHOR_SHOW,
  SANT_LIST,
  SANT_SHOW
} from "../utils/types";

const initialState = {authorList: []};
const authorReducer = (state=initialState, action) => {
    switch (action.type) {
    case AUTHOR_LIST:
      return {
        ...state,
        authors: action.payload.authors,
      };  
    case AUTHOR_SHOW:
      return {
        ...state,
        author: action.payload.author,
      };
    case SANT_LIST:
      return {
        ...state,
        sants: action.payload.sants,
      };
    case SANT_SHOW:
      return {
        ...state,
        sants: action.payload.sants,
        sant: action.payload.sant,
      };
    default: 
      return state
    }
};

export default authorReducer;