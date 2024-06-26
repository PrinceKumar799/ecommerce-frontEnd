import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import searchReducer from '../features/search/searchSlice'
import cartReducer from '../features/cart/cartSlict'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    cart: cartReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch