export const FETCH_BLOGS_SUCCESS = "FETCH_BLOGS_SUCCESS";

const fetchBlogsSuccess = blogs => ({
  type: FETCH_BLOGS_SUCCESS,
  payload: blogs
});

// fetch blogs
export const fetchProducts = blogs => {
  return dispatch => {
    dispatch(fetchBlogsSuccess(blogs));
  };
};
