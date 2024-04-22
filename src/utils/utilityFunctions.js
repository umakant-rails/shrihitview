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
