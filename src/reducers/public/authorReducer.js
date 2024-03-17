import {
  PB_AUTHOR_LIST,
  PB_AUTHOR_SHOW,
  PB_SANT_LIST,
  PB_SANT_SHOW
} from "../../utils/types";

const initialState = {authorList: []};
const authorReducer = (state=initialState, action) => {
  switch (action.type) {
    case PB_AUTHOR_LIST:
      return {
        ...state,
        authors: action.payload.authors,
        total_authors: action.payload.total_authors,
      };  
    case PB_AUTHOR_SHOW:
      return {
        ...state,
        author: action.payload.author,
        articles: action.payload.articles,
        total_articles: action.payload.total_articles,
      };
    case PB_SANT_LIST:
      return {
        ...state,
        sants: action.payload.sants,
      };
    case PB_SANT_SHOW:
      return {
        ...state,
        related_sants: action.payload.sants,
        sant: action.payload.sant
      };
    default: 
      return state
  }
};

export default authorReducer;