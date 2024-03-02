import { act } from "react-dom/test-utils";
import {
  CHAPTER_DELETED,
  SCR_ARTICLE_NEW,
  SCR_ARTICLE_CREATED,
  SCR_ARTICLE_EDIT,
  SCR_ARTICLE_UPDATED,
  SCR_ARTICLE_DELETED,
} from "../../utils/types";

const initialState = {scriptures: []};

const adminScrArticleReducer = (state=initialState, action) => {
  switch (action.type) {
    case SCR_ARTICLE_NEW:
      return {
        ...state,
        scripture: action.payload.scripture,
        sections: action.payload.sections,
        chapters: action.payload.chapters,
        article_types: action.payload.article_types,
      }
    case SCR_ARTICLE_CREATED:
      return {
        ...state,
        scripture_article: action.payload.scripture_article
      }
    case SCR_ARTICLE_EDIT:
      return {
        scripture: action.payload.scripture,
        sections: action.payload.sections,
        chapters: action.payload.chapters,
        article_types: action.payload.article_types,
        scripture_article: action.payload.scripture_article,
      }
    case SCR_ARTICLE_UPDATED:
      return {
        scripture_article_updated: action.payload.scripture_article
      }
    default: 
      return state
  }
};

export default adminScrArticleReducer;