// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const counterSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    postBlogData: (state, action) => {
      state.value.push(action.payload);
    },
    getBlogData: (state, action) => {
      state.value = action.payload;
    },
    deleteBlogData: (state, action) => {
      state.value = state.value.filter((blog) => blog._id !== action.payload._id)
      console.log(state.value)
    },
  },
});

export const { postBlogData, getBlogData, deleteBlogData } = counterSlice.actions;

export const postBlog = (formData) => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch("http://localhost:3000/blogsapi/saveblogs", {
      method: "POST",
      body: formData,
      headers: {
        authorization: `bearer ${accessToken}`
      },
    });
    if (!response.ok) {
      console.log('File upload failed:', response.statusText);
      const errorData = await response.json();
      console.log('Error details:', errorData);
    }

    if (response.ok) {
      const result = await response.json();
    }
  } catch (error) {
    console.log('An error occurred during file upload:', error);
  }
};

export const getBlogs = () => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch("http://localhost:3000/blogsapi/blogdetails", {
      method: "GET",
      headers: {
        authorization: `bearer ${accessToken}`
      },
    });
    if (!response.ok) {
      console.error('Fetching blogs failed:', response.statusText);
      const errorData = await response.json();
      console.error('Error details:', errorData);
    }

    if (response.ok) {
      const result = await response.json();
      dispatch(getBlogData(result));
      console.log(result)
    }
  } catch (error) {
    console.log('An error occurred during fetching blogs:');
  }
};
export const deleteBlog = (_id) => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(`http://localhost:3000/blogsapi/deleteblogs/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData)
    }

    if (response.ok) {
      const result = await response.json();
      dispatch(deleteBlogData(result));
      console.log(result)
    }
  } catch (error) {
    console.log(error);
  }
};
export default counterSlice.reducer;
