import {
  AUTHOR_CREATED,
  AUTHOR_EDIT,
  AUTHOR_LIST,
  AUTHOR_NEW,
  AUTHOR_UPDATED,
  AUTHOR_DELETED,
  SAMPRADAYA_CREATED
} from "../../utils/types";
  
  const initialState = {authorList: []};
  
  const adminAuthorReducer = (state=initialState, action) => {
    switch (action.type) {
      case AUTHOR_NEW:
        return {
          ...state,
          sampradayas: action.payload.sampradayas,
        };
      case SAMPRADAYA_CREATED:
        return {
          sampradayas: action.payload.sampradayas,
          sampradayaCreated: action.payload.sampradaya_created,
        }
      case AUTHOR_LIST:
        return {
          authors: action.payload.authors,
          total_authors: action.payload.total_authors,
          current_page: action.payload.current_page
        };
      case AUTHOR_CREATED:
        return {
          sampradayas: state.sampradayas,
          author: action.payload.author
        }
      case AUTHOR_EDIT:
        return {
          ...state,
          author: action.payload.author,
          sampradayas: action.payload.sampradayas,
        };
      case AUTHOR_UPDATED:
        return {
          ...state,
          authorUpdated: action.payload.author 
        }
      case AUTHOR_DELETED:
        return{
          ...state,
          authors: action.payload.authors,
          total_authors: action.payload.total_authors,
          current_page: action.payload.current_page,
          authorDeleted: action.payload.author
        }
      default: 
        return state
    }
  };
  
  export default adminAuthorReducer;