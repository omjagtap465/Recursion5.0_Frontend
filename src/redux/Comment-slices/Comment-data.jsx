// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  try:true,
};

export const counterSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    CommentUpload: (state, action) => {
      state.value.push(action.payload);
    },
    CommentUploadSuccess: (state, action) => {
      state.value = action.payload;
    },
    CommentUploadFailure: (state, action) => {
      state.value = state.value.filter((blog)=> blog._id!==action.payload._id )
    },
  },
});

export const {CommentUpload,CommentUploadSuccess,CommentUploadFailure} = counterSlice.actions;

export const postComment = (blogId, comment) => async (dispatch) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(`http://localhost:3000/commentapi/comment/${blogId}`, {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json", 
        authorization: `bearer ${accessToken}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
    }

    if (response.ok) {
      const result = await response.json();
      dispatch(CommentUpload(result));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getComment = (blogId) => async (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await fetch(`http://localhost:3000/commentapi/comment/${blogId}`, {
      method: "GET",
      headers: {
        authorization: `bearer ${accessToken}`
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
    }

    if (response.ok) {
      const result = await response.json();
      console.log(`Fetched comments: ${JSON.stringify(result)}`);
      console.log(blogId)
      dispatch(CommentUploadSuccess(result));
    }
  } catch (error) {
    console.error('An error occurred during fetching comments:', error);
  }
};
export const deleteComment = (_id) => async (dispatch) => {  
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await fetch(`http://localhost:3000/commentapi/comment/${_id}`,{
      method:"DELETE",
      headers:{
        authorization: `bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
     console.log(errorData)
    }

    if (response.ok) {
      const result = await response.json();
      dispatch(CommentUploadFailure(result));
      console.log(result)
    }
  } catch (error) {
    console.log(error);
  }
};
export default counterSlice.reducer;

