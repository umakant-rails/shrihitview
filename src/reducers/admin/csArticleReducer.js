import { act } from "react-dom/test-utils";
import {
  CS_ARTICLE_ADD_PAGE,
  CS_FILTERED_ARTICLE,
  CS_ARTICLE_ADD,
  CS_ARTICLE_REMOVE,
} from "../../utils/types";
  
const initialState = {articles: []};

const adminCSArticleReducer = (state=initialState, action) => {
  switch (action.type) {
    case CS_ARTICLE_ADD_PAGE:
      return {
        articles: action.payload.articles,
        totalArticles: action.payload.total_articles,
        authors: action.payload.authors,
        raags: action.payload.raags,
        contexts: action.payload.contexts,
        articleTypes: action.payload.article_types,
        scripture: action.payload.scripture,
        chapters: action.payload.chapters,
        added_articles: action.payload.added_articles,
      };
    case CS_FILTERED_ARTICLE:
      return {
        ...state,
        articles: action.payload.articles,
        added_articles: action.payload.added_articles,
        totalArticles: action.payload.total_articles,
      }
    case CS_ARTICLE_ADD:
      return {
        ...state,
        articles: action.payload.articles,
        added_articles: action.payload.added_articles,
        totalArticles: action.payload.total_articles,
      }
    case CS_ARTICLE_REMOVE:
      return {
        ...state,
        articles: action.payload.articles,
        added_articles: action.payload.added_articles,
        totalArticles: action.payload.total_articles,
      }
    // case CONTEXT_UPDATED:
    //   return {
    //     ...state,
    //     context: action.payload.context,
    //     contexts: action.payload.contexts,
    //     total_contexts: action.payload.total_contexts,
    //     current_page: action.payload.current_page, 
    //   }
    // case CONTEXT_DELETED:
    //   return{
    //     ...state,
    //     context: action.payload.context,
    //     contexts: action.payload.contexts,
    //     total_contexts: action.payload.total_contexts,
    //     current_page: action.payload.current_page,
    //   }
    default: 
      return state
  }
};
  
export default adminCSArticleReducer;
