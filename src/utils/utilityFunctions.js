import moment from "moment/moment";

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

export const getParamsStringFromHash = (searchAttrs) => {
  const arr = Object.keys(searchAttrs).map( key =>{
    if(searchAttrs[key]){
      return `${key}=${searchAttrs[key]}`;
    }
  })
  // const searchAttrStr = arr.join('&');
  return arr.join('&');
}

export const confirmBeforeDeletion = () => {
  return window.confirm('Are you sure to delete this record ?');
}