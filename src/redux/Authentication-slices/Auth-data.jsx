// counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userState: false,
  currentUser: null,
}

export const counterSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
    userAuth: (state, action) => {
      console.log(`this${action.payload.name}`)
      state.currentUser = action.payload.name;
      state.userState = true
      console.log(state.currentUser)
    },
    userAuthState: (state) => {
      state.userState = false
      state.currentUser = undefined
      console.log(state.currentUser)
      console.log(state.userState)
    }
  },
});

export const { userAuth, userAuthState } = counterSlice.actions;

export const createUser = (userData) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3000/userapi/createuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      console.log(response.statusText);
      const errorData = await response.json();
      console.log('Error details:', errorData);
    }

    if (response.ok) {
      const result = await response.json();
      console.log(result)
      dispatch(userAuth(result));
      return result
    }
  } catch (error) {
    console.log('An error occurred', error);
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3000/userapi/loginuser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      console.log(response.statusText);
      const errorData = await response.json();
      console.log('Error details:', errorData);
    }

    if (response.ok) {
      const result = await response.json();
      console.log("bro" + result.token)
      dispatch(userAuth(result));
      return result
    }
  } catch (error) {
    console.log('An error occurred', error);
  }
};

export default counterSlice.reducer;