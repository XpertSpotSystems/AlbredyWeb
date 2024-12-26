import { FETCH_BLOG_SUCCESS } from "../actions/blogActions";

const initState = {
  blogs: []
};

const blogReducer = (state = initState, action) => {
  if (action.type === FETCH_BLOG_SUCCESS) {
    return {
      ...state,
      blogs: action.payload,
      nbpages: action.payload.nbpages
    };
  }

  return state;
};

export default blogReducer;
