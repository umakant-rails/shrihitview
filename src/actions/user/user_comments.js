import baseUrl from "../../services/AxiosService";
import { 
  COMMENT_CREATED, 
  COMMENT_REPLIED, 
  COMMENT_UPDATED, 
  COMMENT_DELETED 
} from "../../utils/types";
import dataDispatchToReducer from "../shared_action";

export const createComment = (article, form) => async dispatch => {
  const response = await baseUrl.post(
    `/articles/${article.id}/comments`, {comment: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);
  dispatch(dataDispatchToReducer(response, COMMENT_CREATED));
}

export const updateComment = (article, form) => async dispatch => {
  console.log('update process start')
  const response = await baseUrl.put(
    `/articles/${article.id}/comments/${form.parent_id}`, {comment: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);
  dispatch(dataDispatchToReducer(response, COMMENT_UPDATED));
}

export const replyComment = (article, form) => async dispatch => {
  const response = await baseUrl.post(
    `/articles/${article.id}/comments/reply`, {comment: form}
  ).then(response => {
    return response;
  }).catch( error => error.response);
  dispatch(dataDispatchToReducer(response, COMMENT_REPLIED));
}

export const deleteComment = (article, comment_id) => async dispatch => {
  const response = await baseUrl.delete(
    `/articles/${article.id}/comments/${comment_id}`,
  ).then(response => {
    return response;
  }).catch( error => error.response);
  dispatch(dataDispatchToReducer(response, COMMENT_DELETED));
}
