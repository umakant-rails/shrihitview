import {
  CS_ARTICLE_ADD_PAGE,
  CS_FILTERED_ARTICLE,
  CS_ARTICLE_ADD,
  CS_ARTICLE_REMOVE,
  CS_SCRIPTURE_SHOW,
  CS_ARTICLE_FOR_INDEXING,
  CS_ARTICLE_DELETED,
  CS_ARTICLE_INDEX_UPDATED,
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
    case CS_SCRIPTURE_SHOW:
      return {
        ...state,
        scripture: action.payload.scripture,
        chapters: action.payload.chapters,
        chapter: action.payload.chapters[0],
        articles: action.payload.articles,
        total_articles: action.payload.total_articles, 
        current_page: action.payload.current_page,
      }
    case CS_ARTICLE_FOR_INDEXING:
      return{
        ...state,
        chapter: action.payload.chapter,
        articles: action.payload.articles,
        total_articles: action.payload.total_articles, 
        current_page: action.payload.current_page,
      }
    case CS_ARTICLE_INDEX_UPDATED:
      return{
        ...state,
        articles: action.payload.articles
      }
    case CS_ARTICLE_DELETED:
      return{
        ...state,
        articles: action.payload.articles,
        total_articles: action.payload.total_articles, 
        current_page: action.payload.current_page,
      }
    default: 
      return state
  }
};
  
export default adminCSArticleReducer;
