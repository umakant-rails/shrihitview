import baseUrl from "../../services/AxiosService";
import {
  SCRIPTURE_CREATED,
  SCRIPTURE_DELETED,
  SCRIPTURE_LIST,
  SCRIPTURE_NEW,
  SCRIPTURE_EDIT,
  SCRIPTURE_UPDATED,
  SET_MESSAGE,
  SCRIPTURE_SHOW,
  CHAPTER_LIST,
  CHAPTER_CREATED,
  CHAPTER_UPDATED,
  CHAPTER_DELETED,
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

  if(response.data.errors === undefined){
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
      payload: response.data.errors.join("\n"),
    });
  }
}

export const getScripture = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/scriptures/${id}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SCRIPTURE_SHOW, 
      payload: {
        statusCode: response.status,
        scripture: response.data.scripture,
        sections: response.data.sections,
        chapters: response.data.chapters,
        total_chapters: response.data.total_chapters,
        current_page: response.data.current_page,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
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

  if(response.data.errors === undefined){
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
      payload: response.data.errors.join("\n"),
    });
  }
}

export const createScripture = (formValues) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/scriptures`, {scripture: formValues} 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SCRIPTURE_CREATED, 
      payload: {
        scriptureCreated: response.data.scripture,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}

export const editScripture = (id) => async dispatch => {
  const response = await baseUrl.get(
    `/admin/scriptures/${id}?action_type=edit`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SCRIPTURE_EDIT, 
      payload: {
        statusCode: response.status,
        scripture: response.data.scripture,
        scripture_types: response.data.scripture_types,
        authors: response.data.authors
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}

export const updateScripture = (id, formValues) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/scriptures/${id}`, {scripture: formValues},
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SCRIPTURE_UPDATED, 
      payload: {
        statusCode: response.status,
        scriptureUpdated: response.data.scripture,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
    });
  }
}

export const deleteScripture = (id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/scriptures/${id}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SCRIPTURE_DELETED, 
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
      payload: response.data.errors.join("\n"),
    });
  }
}

// export const getChapters = (scripture_id, searchAttr) => async dispatch => {
//   const arr = [];
//   Object.keys(searchAttr).map( key =>{
//     let str = `${searchAttr[key]}`
//     if(str.length > 0){
//       arr.push(`${key}=${searchAttr[key]}`)
//     }
//   })
//   const searchAttrStr = arr.join('&');

//   const response = await baseUrl.get(
//     `/admin/scriptures/${scripture_id}/chapters?${searchAttrStr}` 
//   ).then(response => {
//     return response;
//   }).catch(function (error) {
//     return error.response;
//   });

//   if(response.data.errors === undefined){
//     dispatch({
//       type: SET_MESSAGE,
//       msg_type: "success",
//       payload: response.data.notice,
//     });
//     dispatch({
//       type: CHAPTER_LIST, 
//       payload: {
//         scripture: response.data.scripture,
//         chapters: response.data.chapters,
//         sections: response.data.sections,
//         total_chapters: response.data.total_chapters,
//         current_page: response.data.current_page,
//       }
//     });
//   } else {
//     dispatch({
//       type: SET_MESSAGE,
//       msg_type: "error",
//       payload: response.data.errors.join("\n"),
//       // payload: response.data.status.message,
//     });
//   }
// }

// export const createChapter = (scripture_id, formValues) => async dispatch => {
//   const response = await baseUrl.post(
//     `/admin/scriptures/${scripture_id}/chapters`, {chapter: formValues} 
//   ).then(response => {
//     return response;
//   }).catch(function (error) {
//     return error.response;
//   });
//   if(response.data.errors === undefined){
//     dispatch({
//       type: SET_MESSAGE,
//       msg_type: "success",
//       payload: response.data.notice,
//     });
//     dispatch({
//       type: CHAPTER_CREATED, 
//       payload: {
//         chapters: response.data.chapters,
//         sections: response.data.sections,
//         total_chapters: response.data.total_chapters,
//         current_page: response.data.current_page,
//       }
//     });
//   } else {
//     dispatch({
//       type: SET_MESSAGE,
//       msg_type: "error",
//       payload: response.data.errors.join("\n"),
//       // payload: response.data.status.message,
//     });
//   }
// }

// export const updateChapter = (scripture_id, chapter_id, formValues) => async dispatch => {
//   const response = await baseUrl.put(
//     `/admin/scriptures/${scripture_id}/chapters/${chapter_id}`, {chapter: formValues} 
//   ).then(response => {
//     return response;
//   }).catch(function (error) {
//     return error.response;
//   });

//   if(response.data.errors === undefined){
//     dispatch({
//       type: SET_MESSAGE,
//       msg_type: "success",
//       payload: response.data.notice,
//     });
//     dispatch({
//       type: CHAPTER_UPDATED, 
//       payload: {
//         chapters: response.data.chapters,
//         sections: response.data.sections,
//         total_chapters: response.data.total_chapters,
//         current_page: response.data.current_page,
//       }
//     });
//   } else {
//     dispatch({
//       type: SET_MESSAGE,
//       msg_type: "error",
//       payload: response.data.errors.join("\n"),
//     });
//   }
// }

// export const deleteChapter = (scripture_id, chapter_id) => async dispatch => {
//   const response = await baseUrl.delete(
//     `/admin/scriptures/${scripture_id}/chapters/${chapter_id}`, 
//   ).then(response => {
//     return response;
//   }).catch(function (error) {
//     return error.response;
//   });

//   if(response.data.errors === undefined){
//     dispatch({
//       type: SET_MESSAGE,
//       msg_type: "success",
//       payload: response.data.notice,
//     });
//     dispatch({
//       type: CHAPTER_DELETED, 
//       payload: {
//         chapters: response.data.chapters,
//         total_chapters: response.data.total_chapters,
//         current_page: response.data.current_page,
//       }
//     });
//   } else {
//     dispatch({
//       type: SET_MESSAGE,
//       msg_type: "error",
//       payload: response.data.errors.join("\n"),
//     });
//   }
// }