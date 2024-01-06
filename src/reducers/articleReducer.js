import {
  ARTICLE_LIST
  } from "../utils/types";
  
  const initialState = {articleList: []};
  
  const articleReducer = (state=initialState, action) => {
    switch (action.type) {
      case ARTICLE_LIST:
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
  
  export default articleReducer;