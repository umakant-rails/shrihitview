import {
  SCRIPTURE_LIST,
  SCRIPTURE_NEW,
  SCRIPTURE_CREATED,
  SCRIPTURE_DELETED,
  SCRIPTURE_UPDATED,
  SCRIPTURE_EDIT,
  SCRIPTURE_SHOW,
  SCR_CHAPTER_ARTICLES,
} from "../../utils/types";

const initialState = {scripure: null, chapters: []};

const adminScriputureReducer = (state=initialState, action) => {
  switch (action.type) {
    case SCRIPTURE_LIST:
      return {
        scriptures: action.payload.scriptures,
        total_scriptures: action.payload.total_scriptures,
        scripture_types: action.payload.scripture_types,
        current_page: action.payload.current_page
      };
    case SCRIPTURE_SHOW:
      return{
        ...state,
        scripture: action.payload.scripture,
        sections: action.payload.sections,
        chapters: action.payload.chapters,
        articles: action.payload.articles,
        total_articles: action.payload.total_articles,
        current_page: action.payload.current_page
      }
    case SCRIPTURE_NEW:
      return {
        ...state,
        scripture_types: action.payload.scripture_types,
        authors: action.payload.authors,
      };
    case SCRIPTURE_CREATED:
      return {
        scriptureCreated: action.payload.scriptureCreated,
      }
    case SCRIPTURE_EDIT:
      return {
        scripture: action.payload.scripture,
        scripture_types: action.payload.scripture_types,
        authors: action.payload.authors,
      };
    case SCRIPTURE_UPDATED:
      return {
        scriptureUpdated: action.payload.scriptureUpdated,
      }
    case SCRIPTURE_DELETED:
      return{
        ...state,
        scriptures: action.payload.scriptures,
        total_scriptures: action.payload.total_scriptures,
        scripture_types: action.payload.scripture_types,
        current_page: action.payload.current_page
      }
    case SCR_CHAPTER_ARTICLES:
      return {
        ...state,
        articles: action.payload.articles,
        total_articles: action.payload.total_articles
      }
    default: 
      return state
  }
};

export default adminScriputureReducer;