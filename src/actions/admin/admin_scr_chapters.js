import baseUrl from "../../services/AxiosService";
import {
  CHAPTER_LIST,
  CHAPTER_CREATED,
  CHAPTER_UPDATED,
  CHAPTER_DELETED,
  SET_MESSAGE,
} from "../../utils/types";

export const getChapters = (scripture_id, searchAttr) => async dispatch => {
  const arr = [];
  Object.keys(searchAttr).map( key =>{
    let str = `${searchAttr[key]}`
    if(str.length > 0){
      arr.push(`${key}=${searchAttr[key]}`)
    }
  })
  const searchAttrStr = arr.join('&');
  
  const response = await baseUrl.get(
    `/admin/scriptures/${scripture_id}/chapters?${searchAttrStr}` 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
    dispatch({
      type: CHAPTER_LIST, 
      payload: {
        scripture: response.data.scripture,
        chapters: response.data.chapters,
        sections: response.data.sections,
        total_chapters: response.data.total_chapters,
        current_page: response.data.current_page,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
      // payload: response.data.status.message,
    });
  }
}

export const createChapter = (scripture_id, formValues) => async dispatch => {
  const response = await baseUrl.post(
    `/admin/scriptures/${scripture_id}/chapters`, {chapter: formValues} 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });
  if(response.data.errors === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
    dispatch({
      type: CHAPTER_CREATED, 
      payload: {
        chapters: response.data.chapters,
        sections: response.data.sections,
        total_chapters: response.data.total_chapters,
        current_page: response.data.current_page,
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      payload: response.data.errors.join("\n"),
      // payload: response.data.status.message,
    });
  }
}

export const updateChapter = (scripture_id, chapter_id, formValues) => async dispatch => {
  const response = await baseUrl.put(
    `/admin/scriptures/${scripture_id}/chapters/${chapter_id}`, {chapter: formValues} 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
    dispatch({
      type: CHAPTER_UPDATED, 
      payload: {
        chapters: response.data.chapters,
        sections: response.data.sections,
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

export const deleteChapter = (scripture_id, chapter_id) => async dispatch => {
  const response = await baseUrl.delete(
    `/admin/scriptures/${scripture_id}/chapters/${chapter_id}`, 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.data.errors === undefined){
    dispatch({
      type: SET_MESSAGE,
      msg_type: "success",
      payload: response.data.notice,
    });
    dispatch({
      type: CHAPTER_DELETED, 
      payload: {
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