import baseUrl from "../../services/AxiosService";
import {
  SCRIPTURE_LIST,
  SCRIPTURE_NEW,
  SET_MESSAGE,
} from "../../utils/types";

export const getScriptures = (searchAttr) => async dispatch => {
  const arr = [];
  Object.keys(searchAttr).map( key =>{
    if(searchAttr[key]){
      arr.push(`${key}=${searchAttr[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');

  const response = await baseUrl.get(
    `/admin/scriptures?${searchAttrStr}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: SCRIPTURE_LIST, 
      payload: {
        statusCode: response.status,
        scriptures: response.data.scriptures,
        total_scriptures: response.data.total_scriptures,
        scripture_types: response.data.scripture_types,
        current_page: response.data.current_page
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      // payload: response.data.status.message,
    });
  }
}

export const newScripture = () => async dispatch => {
  const response = await baseUrl.get(
    `/admin/scriptures/new`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: SCRIPTURE_NEW, 
      payload: {
        statusCode: response.status,
        scripture_types: response.data.scripture_types,
        authors: response.data.authors,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      // payload: response.data.status.message,
    });
  }
}

export const createScripture = (id, formValues) => async dispatch => {

}
export const updateScripture = (id, formValues) => async dispatch => {

}

export const deleteScripture = (id) => async dispatch => {

}

// export const createTag = (formValues) => async dispatch => {
//   const response = await baseUrl.post(
//     '/tags', {tag: formValues}
//   ).then(response => {
//     return response;
//   }).catch(function (error) {
//     return error.response;
//   });

//   if(response && response.status === 200){
//     dispatch({
//       type: SET_MESSAGE,
//       msg_type: "success",
//       payload: response.data.notice,
//     });
//     dispatch({
//       type: TAG_CREATED, 
//       payload: {
//         tag: response.data.tag,
//         tags: response.data.tags,
//         total_tags: response.data.total_tags,
//         current_page: response.data.current_page
//       }
//     });
//   } else if(response){
//     dispatch({
//       type: SET_MESSAGE,
//       msg_type: "error",
//       payload: response.statusText
//     });
//   }
// }

// export const updateTag = (id, form) => async dispatch => {
//   const response = await baseUrl.put(
//     `/tags/${id}`, {tag: form}
//   ).then(response => {
//     return response;
//   }).catch(function (error) {
//     return error.response;
//   });
  
//   if(response.data.error === undefined){
//     dispatch({
//       type: SET_MESSAGE,
//       msg_type: "success",
//       payload: response.data.notice,
//     });
//      dispatch({
//       type: TAG_UPDATED, 
//       payload: {
//         tag: response.data.tag,
//         tags: response.data.tags,
//         total_tags: response.data.total_tags,
//         current_page: response.data.current_page
//       }
//     });
//   } else {
//     dispatch({
//       type: SET_MESSAGE,
//       msg_type: "error",
//       payload: response.data.error.join("\n"),
//     });
//   }
// }

// export const deleteTag = (id) => async dispatch => {
//   const response = await baseUrl.delete(
//     `/tags/${id}`
//   ).then(response => {
//     return response;
//   }).catch(function (error) {
//     return error.response;
//   });

//   if(response.data.error === undefined){
//     dispatch({
//       type: SET_MESSAGE,
//       msg_type: "success",
//       payload: response.data.notice,
//     });
//      dispatch({
//       type: TAG_DELETED,
//       payload: {
//         tag: response.data.tag,
//         tags: response.data.tags,
//         total_tags: response.data.total_tags,
//         current_page: response.data.current_page
//       }
//     });
//   } else {
//     dispatch({
//       type: SET_MESSAGE,
//       msg_type: "error",
//       payload: response.data.error.join("\n"),
//     });
//   }
// }
