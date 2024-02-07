import {
  HOME_PAGE
} from "../../utils/types";
  
const initialState = {};

const homeReducer = (state=initialState, action) => {
  switch (action.type) {
    case HOME_PAGE:
      return {
        articles: action.payload.articles,
        authors: action.payload.authors,
        tags: action.payload.tags,
        contexts: action.payload.contexts,
        article_types: action.payload.article_types
      };
    default: 
      return state
  }
};

export default homeReducer;