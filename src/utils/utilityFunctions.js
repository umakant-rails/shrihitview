import moment from "moment/moment";
import { PAKSH, TITHIS } from "./types";

export const dateFormat = (dateStr, withTime) => { 
  if(withTime){
    return moment(dateStr).format('DD/MM/YYYY, h:mm A')
  } else {
    return moment(dateStr).format('DD/MM/YYYY');
  }
}

export const imageNamefromScrName = (scriptureName) => {
  return scriptureName.split(" ").map((el) => el.toLowerCase()).join("_");
}

export const tithiName = (tithi, isTrue) => {
  if(tithi.tithi === 11){ return `${tithi.paksh} एकादशी` } 
  else if(tithi.paksh === 'शुक्ळ पक्ष' && tithi.tithi === 15){ return `पूर्णिमा` }
  else if (tithi.paksh === 'कृष्ण पक्ष' && tithi.tithi === 15){ return `अमावस्या` } 
  else { return isTrue ? `${tithi.paksh}-${tithi.tithi}` : `${tithi.title}` } 
}