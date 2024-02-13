import {
  ARTICLE_NEW,
  ARTICLE_LIST,
  ARTICLE_CREATED,
  TAG_CREATED,
  ARTICLE_SHOW,
  ARTICLE_EDIT,
  ARTICLE_UPDATED,
  ARTICLE_DELETED
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
          articleTypes: action.payload.article_types
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
          totalArticles: action.payload.totalArticles,
          authors: action.payload.authors,
          raags: action.payload.raags,
          tags: action.payload.tags,
          contexts: action.payload.contexts,
          articleTypes: action.payload.articleTypes,
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
          articleTypes: action.payload.articleTypes,
          scriptures: action.payload.scriptures
        };
      case ARTICLE_UPDATED:
        return {
          ...state,
          updatedArticle: action.payload.articleUpdated 
        }
      case ARTICLE_DELETED:
        return{
          ...state,
          articles: action.payload.articles,
          totalArticles: action.payload.total_articles,
        }
      default: 
        return state
    }
  };
  
  export default adminArticleReducer;