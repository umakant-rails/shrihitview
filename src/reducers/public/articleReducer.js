import {
  PB_ARTICLE_LIST,
  PB_ARTICLE_SHOW
} from "../../utils/types";
  
  const initialState = {articleList: []};
  
  const articleReducer = (state=initialState, action) => {
    switch (action.type) {
      case PB_ARTICLE_LIST:
        return {
          ...state,
          articles: action.payload.articles,
          authors: action.payload.authors,
          tags: action.payload.tags,
          contexts: action.payload.contexts,
          article_types: action.payload.article_types
        };
      case PB_ARTICLE_SHOW:
        return {
          ...state,
          article: action.payload.article
        };
      default: 
        return state
    }
  };
  
  export default articleReducer;