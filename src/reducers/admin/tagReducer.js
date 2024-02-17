import {
  TAG_LIST,
  TAG_CREATED,
  TAG_EDIT,
  TAG_UPDATED,
  TAG_DELETED,
  SET_MESSAGE,
} from "../../utils/types";
  
  const initialState = {authorList: []};
  
  const adminTagReducer = (state=initialState, action) => {
    switch (action.type) {
      // case AUTHOR_NEW:
      //   return {
      //     ...state,
      //     sampradayas: action.payload.sampradayas,
      //   };
      // case SAMPRADAYA_CREATED:
      //   return {
      //     sampradayas: action.payload.sampradayas,
      //     sampradayaCreated: action.payload.sampradaya_created,
      //   }
      case TAG_LIST:
        return {
          tags: action.payload.tags,
          total_tags: action.payload.total_tags,
          current_page: action.payload.current_page
        };
      case TAG_CREATED:
        return {
          ...state,
          tag: action.payload.tag,
          tags: action.payload.tags,
          total_tags: action.payload.total_tags,
          current_page: action.payload.current_page,
        }
      case TAG_UPDATED:
        return {
          ...state,
          tag: action.payload.tag,
          tags: action.payload.tags,
          total_tags: action.payload.total_tags,
          current_page: action.payload.current_page, 
        }
      case TAG_DELETED:
        return{
          ...state,
          tag: action.payload.tag,
          tags: action.payload.tags,
          total_tags: action.payload.total_tags,
          current_page: action.payload.current_page,
        }
      default: 
        return state
    }
  };
  
  export default adminTagReducer;