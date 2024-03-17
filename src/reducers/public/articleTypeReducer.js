import {
    PB_ARTICLE_TYPE_LIST,
    PB_ARTICLE_TYPE_SHOW,
  } from "../../utils/types";
  
  const initialState = {article_types: []};
  const articleTypeReducer = (state=initialState, action) => {
      switch (action.type) {
      case PB_ARTICLE_TYPE_LIST:
        return {
          ...state,
          article_types: action.payload.article_types,
          total_article_types: action.payload.total_article_types
        };
      case PB_ARTICLE_TYPE_SHOW:
        return {
          ...state,
          article_type: action.payload.article_type,
          articles: action.payload.articles,
          total_articles: action.payload.total_articles
        };
      default: 
        return state
      }
  };
  
  export default articleTypeReducer;