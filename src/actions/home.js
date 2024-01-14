import baseUrl from "../services/AxiosService";
import { 
  HOME_PAGE,
  SET_MESSAGE
} from "../utils/types";

export const getHomePageData = () => async dispatch => {
  let statusCode = null; 
  const response = await baseUrl.get(
    '/pb/home', 
  ).then(response => {
    return response;
  }).catch(function (error) {
    return error.response;
  });

  if(response.status === 200){
    dispatch({
      type: HOME_PAGE, 
      payload: {
        statusCode: response.status,
        articles: response.data.articles,
        authors: response.data.authors,
        tags: response.data.tags,
        contexts: response.data.contexts,
        article_types: response.data.article_types
      }
    });
  } else {
    dispatch({
      type: SET_MESSAGE,
      msg_type: "error",
      // payload: response.data.status.message,
    });
  }
};
