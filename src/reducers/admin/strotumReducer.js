import {
  STROTUM_LIST,
  STROTUM_NEW,
  STROTUM_CREATED,
  STROTUM_EDIT,
  STROTUM_UPDATED,
  STROTUM_DELETED
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
          strota: action.payload.strota,
          total_strota: action.payload.total_strota,
          current_page: action.payload.current_page
        };
      case STROTUM_CREATED:
        console.log(action.payload)
        return {
          ...state,
          strotum: action.payload.strotum,
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
          updatedStrotum: action.payload.updatedStrotum,
        }
      case STROTUM_DELETED:
        return{
          ...state,
          strota: action.payload.strota,
          total_strota: action.payload.total_strota,
          current_page: action.payload.current_page
        }
      default: 
        return state
    }
  };
  
  export default adminStrotumReducer;