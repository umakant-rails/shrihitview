import {
  CHAPTER_LIST,
  CHAPTER_CREATED,
  CHAPTER_UPDATED,
  CHAPTER_DELETED,
} from "../../utils/types";

const initialState = {scriptures: []};

const adminScrChapterReducer = (state=initialState, action) => {
  switch (action.type) {
    case CHAPTER_LIST:
      return {
        ...state,
        scripture: action.payload.scripture,
        chapters: action.payload.chapters,
        total_chapters: action.payload.total_chapters,
        current_page: action.payload.current_page,
      }
    case CHAPTER_CREATED:
      return {
        ...state,
        chapter: action.payload.chapter,
        chapters: action.payload.chapters,
        sections: action.payload.sections,
        total_chapters: action.payload.total_chapters,
        current_page: action.payload.current_page,
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

export default adminScrChapterReducer;