import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const websocketSlice = createSlice({
  name: 'wss',
  initialState,
  reducers: {
    connect(state) {
      return { ...state, connected: false, connecting: true }
    },
    connected(state) {
      return { ...state, connected: true, connecting: false }
    },
    send(state, action) {
      return { ...state, message: action.payload }
    },
    disconnect(state) {
      return { ...state, connected: false }
    },
  },
})

const websocketAction = websocketSlice.actions

export { websocketAction, websocketSlice }
