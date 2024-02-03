import {
  ARTICLE_NEW,
  ARTICLE_CREATED,
  TAG_CREATED,
  PB_ARTICLE_LIST,
  ARTICLE_SHOW
} from "../utils/types";
  
  const initialState = {articleList: []};
  
  const articleReducer = (state=initialState, action) => {
    switch (action.type) {
      case ARTICLE_NEW:
        return {
          ...state,
          article: action.payload.article,
          raags: action.payload.raags,
          authors: action.payload.authors,
          scriptures: action.payload.scriptures,
          tags: action.payload.tags,
          contexts: action.payload.contexts,
          article_types: action.payload.article_types
        };
      case ARTICLE_CREATED:
        return {
          ...state,
          articleCreated: action.payload.articleCreated
        }
      case TAG_CREATED:
        return{
          ...state,
          tags: action.payload.tags
        }
      case PB_ARTICLE_LIST:
        return {
          ...state,
          articles: action.payload.articles,
          authors: action.payload.authors,
          tags: action.payload.tags,
          contexts: action.payload.contexts,
          article_types: action.payload.article_types
        };
      case ARTICLE_SHOW:
        return {
          ...state,
          article: action.payload.article
        };
      default: 
        return state
    }
  };
  
  export default articleReducer;