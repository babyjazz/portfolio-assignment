import { websocketSlice } from '@/store/websocket'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout() {
      return initialState
    },
  },
})

const authenticationAction = authenticationSlice.actions

export { authenticationAction, authenticationSlice }
