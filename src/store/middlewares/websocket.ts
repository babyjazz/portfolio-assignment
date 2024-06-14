import { MessageType, WssFunctionNameMessageType } from '@/enums/websocket'
import type { Action } from '@/store'
import { authSlice } from '@/store/authentication'
import { portfolioSlice } from '@/store/portfolio'
import { websocketSlice } from '@/store/websocket'
import { IWebsocketMeta } from '@/store/websocket/slice'
import setIntervalIntermediate from '@/utils/setIntervalIntermediate'
import { Middleware } from '@reduxjs/toolkit'

export const websocketMiddleware: Middleware = ({ getState, dispatch }) => {
  let wss: WebSocket | null
  let portfolioInterval: null | ReturnType<typeof setInterval> = null
  return (next) => (action) => {
    switch ((action as Action<string, string>).type) {
      case websocketSlice.actions.connect().type:
        {
          const _action = action as Action<string, string> // replace unknow type from middleware
          if (!wss) {
            wss = new WebSocket(_action.payload)
            wss.onopen = () => {
              dispatch(websocketSlice.actions.connected())

              // Interval fetch portfolio every 5s
              if (!portfolioInterval) {
                portfolioInterval = setIntervalIntermediate(() => {
                  dispatch(
                    websocketSlice.actions.send({
                      n: WssFunctionNameMessageType.GetLevel1Summary,
                      o: JSON.stringify({ OMSId: 1 }),
                    }),
                  )
                }, 5000)
              }
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
            wss.onclose = () => {
              if (portfolioInterval && wss) {
                clearInterval(portfolioInterval)
                portfolioInterval = null
                wss = null
              }
            }
          }
        }
        break

      case websocketSlice.actions.send(null).type: {
        const _action = action as {
          type: Action['type']
          payload: Pick<IWebsocketMeta['send'], 'n' | 'o'>
        }
        if (wss) {
          const i = getState().wss.send.i
          const payload = {
            m: MessageType.send,
            i: i + 2,
            ..._action.payload,
          }
          wss?.send(JSON.stringify(payload))

          return next({ type: _action.type, payload })
        }
        break
      }

      case websocketSlice.actions.receive(null).type: {
        const _action = action as {
          type: string
          payload: IWebsocketMeta['receive']
        }
        switch (_action.payload?.n) {
          case WssFunctionNameMessageType.AuthenticateUser:
            {
              if (_action.payload?.o?.Authenticated) {
                dispatch(authSlice.actions.auth(_action.payload?.o))
              } else {
                dispatch(authSlice.actions.error(_action.payload?.o))
              }
            }
            break

          case WssFunctionNameMessageType.GetLevel1Summary:
            dispatch(
              portfolioSlice.actions.setPortfolio(
                _action.payload?.o?.map((o: string) => {
                  return JSON.parse(o)
                }),
              ),
            )
            break

          case WssFunctionNameMessageType.LogOut:
            dispatch(authSlice.actions.logout())
            break

          default:
            break
        }
        break
      }

      case websocketSlice.actions.disconnect().type: {
        wss?.close()
        break
      }

      default:
        break
    }

    return next(action)
  }
}
