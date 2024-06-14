import { MessageType } from '@/enums/websocket'
import { createSlice } from '@reduxjs/toolkit'

export interface IWebsocketMeta {
  isConnected: boolean
  isConnecting: boolean
  send: {
    /** The type of the message */
    m: MessageType
    /** identity */
    i: number
    /** function name */
    n: string | null
    /** payload */
    o: string | null
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  receive: any
}

const initialState: IWebsocketMeta = {
  isConnected: false,
  isConnecting: false,
  send: {
    m: MessageType.send,
    i: 0,
    n: null,
    o: null,
  },
  receive: null,
}

const websocketSlice = createSlice({
  name: 'wss',
  initialState,
  reducers: {
    connect(state) {
      return { ...state, isConnected: false, isConnecting: true }
    },
    connected(state) {
      return { ...state, isConnected: true, isConnecting: false }
    },
    send(state, action) {
      return {
        ...state,
        send: {
          m: MessageType.send,
          i: state.send.i + 2,
          ...action.payload,
        },
      }
    },
    receive(state, action) {
      return { ...state, receive: action.payload }
    },
    disconnect(state) {
      return { ...state, isConnected: false }
    },
  },
})

export default websocketSlice
