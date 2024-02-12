import {
  ARTICLE_NEW,
  ARTICLE_LIST,
  ARTICLE_CREATED,
  TAG_CREATED,
  ARTICLE_SHOW,
  ARTICLE_EDIT,
  ARTICLE_UPDATED,
} from "../../utils/types";
  
  const initialState = {articleList: []};
  
  const adminArticleReducer = (state=initialState, action) => {
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
        return {
          ...state,
          tags: action.payload.tags
        }
      case ARTICLE_LIST:
        return {
          articles: action.payload.articles,
          total_articles: action.payload.total_articles,
          authors: action.payload.authors,
          raags: action.payload.raags,
          tags: action.payload.tags,
          contexts: action.payload.contexts,
          article_types: action.payload.article_types,
          scriptures: action.payload.scriptures
        };
      case ARTICLE_SHOW:
        return {
          article: action.payload.article
        }
      case ARTICLE_EDIT:
        return {
          article: action.payload.article,
          authors: action.payload.authors,
          raags: action.payload.raags,
          tags: action.payload.tags,
          contexts: action.payload.contexts,
          article_types: action.payload.article_types,
          scriptures: action.payload.scriptures
        };
      case ARTICLE_UPDATED:
        return {
          ...state, 
          updatedArticle: action.payload.articleUpdated 
        }
      default: 
        return state
    }
  };
  
  export default adminArticleReducer;