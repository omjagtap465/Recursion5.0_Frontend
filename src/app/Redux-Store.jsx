import { configureStore } from '@reduxjs/toolkit'
import BlogsReducer from '../redux/Blog-slices/Blog-data'
import CommentsReducer from '../redux/Comment-slices/Comment-data'
import AuthenticationReducer from '../redux/Authentication-slices/Auth-data'
export const store = configureStore({
  reducer: {
    blogs: BlogsReducer,
    comments: CommentsReducer,
    authenticate: AuthenticationReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})