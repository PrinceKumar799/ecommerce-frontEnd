import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
interface AuthState {
  isLoggedIn: boolean
}

// Define the initial state using that type
const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('authToken') ? true : false,
}

export const counterSlice = createSlice({
  name: 'loginStatus',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
      login: (state) => {
          state.isLoggedIn = true;
      },
      logout: (state) => {
          state.isLoggedIn = false;
      }
  },
})

export const { login, logout } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.auth.isLoggedIn

export default counterSlice.reducer