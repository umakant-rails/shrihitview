import {
  ADMIN_ARTICLE_LIST,
  ADMIN_ARTICLES_BY_PAGE,
  ADMIN_ARTICLE_APPROVED,
  ADMIN_ARTICLE_DELETED,
 
} from "../../utils/types";
  
  const initialState = {articleList: []};
  
  const adminArticleReducer = (state=initialState, action) => {
    switch (action.type) {
      case ADMIN_ARTICLE_LIST:
        return {
          articles: action.payload.articles,
          totalArticles: action.payload.total_articles,
          authors: action.payload.authors,
          raags: action.payload.raags,
          contexts: action.payload.contexts,
          scriptures: action.payload.scriptures,
          articleTypes: action.payload.article_types,
          current_page: action.payload.current_page,
        };
      case ADMIN_ARTICLE_APPROVED:
        return {
          ...state,
          articles: action.payload.articles,
          totalArticles: action.payload.total_articles,
          current_page: action.payload.current_page,
        }
      case ADMIN_ARTICLE_DELETED:
        return{
          ...state,
          articles: action.payload.articles,
          totalArticles: action.payload.total_articles,
          current_page: action.payload.current_page,
        }
      case ADMIN_ARTICLES_BY_PAGE:
        return {
          ...state,
          articles: action.payload.articles,
          totalArticles: action.payload.total_articles,
          current_page: action.payload.current_page,
        }
      default: 
        return state
    }
  };
  
  export default adminArticleReducer;