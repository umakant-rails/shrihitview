import {
  PANCHANG_LIST,
  PANCHANG_CREATED,
  PANCHANG_DELETED,
  PANCHANG_SHOW,
  PANCHANG_UPDATED,
 
} from "../../utils/types";
  
  const initialState = {panchangList: []};
  
  const adminPanchangReducer = (state=initialState, action) => {
    switch (action.type) {
      case PANCHANG_LIST:
        return {
          ...state,
          panchangs: action.payload.panchangs,
          total_panchangs: action.payload.total_panchangs,
        }
      case PANCHANG_CREATED:
        return {
          ...state,
          panchang: action.payload.panchang,
        }
      case PANCHANG_SHOW:
        return {
          panchang: action.payload.panchang,
        }
      case PANCHANG_UPDATED:
        return {
          panchangs: action.payload.panchangs,
          total_panchangs: action.payload.total_panchangs,
          updatedPanchang: true,
        }
      case PANCHANG_DELETED:
        return {
          ...state,
          panchangs: action.payload.panchangs,
          total_panchangs: action.payload.total_panchangs,
        }
      default: 
        return state
    }
  };
  
  export default adminPanchangReducer;