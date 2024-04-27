import {
  NAVIGATE_MONTH,
  PANCHANG_TITHI_CREATED,
  PANCHANG_TITHI_DELETED,
  PANCHANG_TITHI_EDITING_DATA,
  PANCHANG_TITHI_NEW,
  PANCHANG_TITHI_UPDATED,
  
} from "../../utils/types";
    
const initialState = {panchangList: []};

const adminPanchangTithiReducer = (state=initialState, action) => {
  switch (action.type) {
    // case PANCHANG_TITHI_NEW:
    //   console.log(action.payload)
    //   return {
    //     ...state,
    //     tithi: action.payload.last_tithi,
    //     current_month: action.payload.month,
    //   }
    case PANCHANG_TITHI_CREATED:
      return {
        isCreated: true,
        tithi: action.payload.tithi,
        tithis: action.payload.tithis,
        current_month: action.payload.current_month,
      }
    case NAVIGATE_MONTH:
      return {
        panchang: action.payload.panchang,
        tithis: action.payload.tithis,
        tithi: action.payload.tithi,
        current_month: action.payload.current_month,
      }
    case PANCHANG_TITHI_EDITING_DATA:
      return {
        ...state,
        panchang: action.payload.panchang,
        tithis: action.payload.tithis,
        months: action.payload.months,
      }
    case PANCHANG_TITHI_UPDATED:
      return {
        ...state,
        panchang: action.payload.panchang,
        tithis: action.payload.tithis,
        months: action.payload.months,
      }
    case PANCHANG_TITHI_DELETED:
      return {
        ...state,
        panchang: action.payload.panchang,
        tithis: action.payload.tithis,
        months: action.payload.months,
      }
    default: 
        return state
  }
};

export default adminPanchangTithiReducer;