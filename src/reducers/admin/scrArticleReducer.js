import { act } from "react-dom/test-utils";
import {
  CHAPTER_LIST,
  CHAPTER_CREATED,
  CHAPTER_UPDATED,
  CHAPTER_DELETED,
  SCR_ARTICLE_NEW,
  SCR_ARTICLE_CREATED,
  SCR_ARTICLE_UPDATED,
  SCR_ARTICLE_DELETED,
} from "../../utils/types";

const initialState = {scriptures: []};

const adminScrArticleReducer = (state=initialState, action) => {
  switch (action.type) {
    case CHAPTER_LIST:
      return {
        ...state,
        scripture: action.payload.scripture,
        arti: action.payload.chapters,
        total_chapters: action.payload.total_chapters,
        current_page: action.payload.current_page,
      }
    case SCR_ARTICLE_NEW:
      console.log(action.payload)
      return {
        ...state,
        scripture: action.payload.scripture,
        article_types: action.payload.article_types,
      }
    case CHAPTER_UPDATED:
      return {
        ...state,
        chapters: action.payload.chapters,
        sections: action.payload.sections,
        total_chapters: action.payload.total_chapters,
        current_page: action.payload.current_page,
      }
    case CHAPTER_DELETED:
      return {
        ...state,
        chapter: action.payload.chapter,
        chapters: action.payload.chapters,
        sections: action.payload.sections,
        total_chapters: action.payload.total_chapters,
        current_page: action.payload.current_page,
      }
    default: 
      return state
  }
};

export default adminScrArticleReducer;