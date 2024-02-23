import {
  SCRIPTURE_LIST,

} from "../../utils/types";

const initialState = {scriptures: []};

const adminScriputureReducer = (state=initialState, action) => {
  switch (action.type) {
    case SCRIPTURE_LIST:
      return {
        scriptures: action.payload.scriptures,
        total_scriptures: action.payload.total_tscriptures,
        scripture_types: action.payload.scripture_types,
        current_page: action.payload.current_page
      };
    // case TAG_CREATED:
    //   return {
    //     ...state,
    //     tag: action.payload.tag,
    //     tags: action.payload.tags,
    //     total_tags: action.payload.total_tags,
    //     current_page: action.payload.current_page,
    //   }
    // case TAG_UPDATED:
    //   return {
    //     ...state,
    //     tag: action.payload.tag,
    //     tags: action.payload.tags,
    //     total_tags: action.payload.total_tags,
    //     current_page: action.payload.current_page, 
    //   }
    // case TAG_DELETED:
    //   return{
    //     ...state,
    //     tag: action.payload.tag,
    //     tags: action.payload.tags,
    //     total_tags: action.payload.total_tags,
    //     current_page: action.payload.current_page,
    //   }
    default: 
      return state
  }
};

export default adminScriputureReducer;