import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false
  },
  reducers: {
    set: (state) => {
      state.isLoading = true
    },
    reset: (state) => {
      state.isLoading = false
    }
  }
})

export const { set, reset } = loadingSlice.actions
export default loadingSlice.reducer