
export const dateFormat = (dateStr) => { 
  let date = new Date(dateStr);
  return `${('0'+date.getDate()).slice(-2)}/${('0'+date.getMonth() + 1).slice(-2)}/${date.getFullYear()}`;
}

export const imageNamefromScrName = (scriptureName) => {
  return scriptureName.split(" ").map((el) => el.toLowerCase()).join("_");
}