import {
  AUTHOR_LIST,
  AUTHOR_SHOW,
} from "../utils/types";
const initialState = {};

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
    default: 
      return state
    }
};

export default authorReducer;