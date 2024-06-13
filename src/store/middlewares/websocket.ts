import type { Action } from '@/store'
import { websocketSlice } from '@/store/websocket/slice'
import { Middleware } from '@reduxjs/toolkit'

export const websocketMiddleware: Middleware = ({ dispatch }) => {
  let wss: WebSocket | null
  return (next) => (action) => {
    const _action = action as Action // replace unknow type middleware
    switch (_action.type) {
      case websocketSlice.actions.connect().type:
        wss = new WebSocket(_action.payload)
        wss.onopen = () => {
          dispatch(websocketSlice.actions.connected())
        }
        break

      case websocketSlice.actions.send('').type:
        if (wss) {
          wss?.send(_action.payload)
        }
        break

      default:
        break
    }
    return next(action)
  }
}
