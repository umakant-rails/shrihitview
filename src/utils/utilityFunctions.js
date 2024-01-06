
export const dateFormat = (dateStr) => { 
    let date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}