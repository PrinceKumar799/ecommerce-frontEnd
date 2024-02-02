import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
interface CartState{
    counter: number
}

// Define the initial state using that type
const initialState: CartState = {
  counter: 0,
}

export const cartSlice = createSlice({
  name: 'cartCounter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
      add: (state) => {
          state.counter = state.counter + 1;
      },
      remove: (state) => {
          state.counter = state.counter - 1;
      }
  },
})

export const { add,remove } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSearch = (state: RootState) => state.search.searchTerm 

export default cartSlice.reducer