import { createSlice } from "@reduxjs/toolkit"

const initialState: any = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (_, action) => action.payload,
    logout: () => {
      return initialState
    },
    updateAccessToken: (state: any, action) => {
      if(state) {
        state.accessToken = action.payload;
      }
    }
  }
})

export const { login, logout, updateAccessToken } = userSlice.actions;
export default userSlice.reducer;