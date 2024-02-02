import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
interface SearchState{
  searchTerm: string
}

// Define the initial state using that type
const initialState: SearchState = {
  searchTerm: "",
}

export const searchSlice = createSlice({
  name: 'serachTerm',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
      edit: (state,action: PayloadAction<string>) => {
          state.searchTerm = action.payload;
      }
  },
})

export const { edit } = searchSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSearch = (state: RootState) => state.search.searchTerm 

export default searchSlice.reducer