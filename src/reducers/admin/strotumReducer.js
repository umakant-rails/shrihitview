import {
  STROTUM_LIST,
  STROTUM_NEW,
  STROTUM_CREATED,
  STROTUM_SHOW,
  STROTUM_EDIT,
  STROTUM_UPDATED,
  STROTUM_DELETED,
  STROTUM_ARTICLE_CREATED,
  STROTUM_ARTICLE_UPDATED,
  STROTUM_ARTICLE_DELETED,
  STROTUM_ARTICLE_INDEX_UPDATED,
} from "../../utils/types";
  
  const initialState = {strota: []};
  
  const adminStrotumReducer = (state=initialState, action) => {
    switch (action.type) {
      case STROTUM_NEW:
        return {
          ...state,
          strota_types: action.payload.strota_types,
        };
      case STROTUM_LIST:
        return {
          ...state,
          article_types: action.payload.article_types,
          strota_types: action.payload.strota_types,
          strota: action.payload.strota,
          total_strota: action.payload.total_strota,
          current_page: action.payload.current_page
        };
      case STROTUM_CREATED:
        return {
          ...state,
          strotum: action.payload.strotum,
        }
      case STROTUM_SHOW:
        return {
          ...state,
          strotum: action.payload.strotum,
          strotum_articles: action.payload.strotum_articles,
          article_types: action.payload.article_types,
        }
      case STROTUM_EDIT:
        return {
          ...state,
          strotum: action.payload.strotum,
          strota_types: action.payload.strota_types,
        };
      case STROTUM_UPDATED:
        return {
          ...state,
          updatedStrotum: action.payload.strotum,
        }
      case STROTUM_DELETED:
        return{
          ...state,
          strota: action.payload.strota,
          total_strota: action.payload.total_strota,
          current_page: action.payload.current_page
        }
      case STROTUM_ARTICLE_CREATED:
        return {
          ...state,
          strotum_article: action.payload.strotum_article,
          strotum_articles: action.payload.strotum_articles
        }
      case STROTUM_ARTICLE_UPDATED:
        return {
          ...state,
          strotum_article: action.payload.strotum_article,
          strotum_articles: action.payload.strotum_articles
        }
      case STROTUM_ARTICLE_INDEX_UPDATED:
        return{
          ...state,
          strotum_articles: action.payload.strotum_articles
        }
      case STROTUM_ARTICLE_DELETED:
        return {
          ...state,
          strotum_articles: action.payload.strotum_articles
        }
      default: 
        return state
    }
  };
  
  export default adminStrotumReducer;