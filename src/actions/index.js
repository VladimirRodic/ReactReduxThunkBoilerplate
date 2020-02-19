import _ from "lodash";
import axios from "axios";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  // get user data for each unique user from posts array
  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async dispatch => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  dispatch({ type: "FETCH_USER", payload: response.data });
};
