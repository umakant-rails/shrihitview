
export const dateFormat = (dateStr) => { 
  let date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export const imageNamefromScrName = (scriptureName) => {
  return scriptureName.split(" ").map((el) => el.toLowerCase()).join("_");
}