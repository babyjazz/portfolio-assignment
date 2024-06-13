import { createSlice } from '@reduxjs/toolkit'

const initialState = { accessToken: null }

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    refreshToken(state, action) {
      state.accessToken = action.payload?.accessToken
    },
    logout() {
      return initialState
    },
  },
})

const authenticationAction = authenticationSlice.actions

export { authenticationAction, authenticationSlice }
