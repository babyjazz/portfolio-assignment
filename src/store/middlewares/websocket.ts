import { MessageType } from '@/enums/websocket'
import type { Action } from '@/store'
import { websocketSlice } from '@/store/websocket'
import { IWebsocketMeta } from '@/store/websocket/slice'
import { Middleware } from '@reduxjs/toolkit'

export const websocketMiddleware: Middleware = ({ getState, dispatch }) => {
  let wss: WebSocket | null
  return (next) => (action) => {
    const _action = action as Action // replace unknow type from middleware
    switch (_action.type) {
      case websocketSlice.actions.connect().type:
        {
          if (!wss) {
            wss = new WebSocket((_action as Action<string, string>).payload)
            wss.onopen = () => {
              dispatch(websocketSlice.actions.connected())
            }
            wss.onmessage = (e) => {
              try {
                const data = JSON.parse(e?.data)
                dispatch(
                  websocketSlice.actions.receive({
                    ...data,
                    o: JSON.parse(data?.o || '{}'),
                  }),
                )
              } catch (error) {
                console.error('[SYSTEM]: cannot parse receive message')
              }
            }
          }
        }
        break

      case websocketSlice.actions.send('').type:
        if (wss) {
          const i = getState().wss.send.i
          const payload = {
            m: MessageType.send,
            i: i + 2,
            ...(
              action as {
                type: Action['type']
                payload: Pick<IWebsocketMeta['send'], 'n' | 'o'>
              }
            ).payload,
          }
          wss?.send(JSON.stringify(payload))

          return next({ type: _action.type, payload })
        }
        break

      default:
        break
    }

    return next(action)
  }
}
