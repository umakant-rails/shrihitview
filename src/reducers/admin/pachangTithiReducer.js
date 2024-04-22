import {
  NAVIGATE_MONTH,
  PANCHANG_TITHI_CREATED,
  PANCHANG_TITHI_NEW,
  
} from "../../utils/types";
    
const initialState = {panchangList: []};

const adminPanchangTithiReducer = (state=initialState, action) => {
  switch (action.type) {
    case PANCHANG_TITHI_NEW:
      return {
        ...state,
        panchang: action.payload.panchang,
        tithis: action.payload.tithis,
        current_month: action.payload.current_month,
      }
    case PANCHANG_TITHI_CREATED:
      return {
        ...state,
        tithi: action.payload.tithi,
        tithis: action.payload.tithis,
        current_month: action.payload.current_month,
      }
    case NAVIGATE_MONTH:
      return {
        ...state,
        panchang: action.payload.panchang,
        tithis: action.payload.tithis,
        current_month: action.payload.current_month,
      }
    default: 
        return state
  }
};

export default adminPanchangTithiReducer;