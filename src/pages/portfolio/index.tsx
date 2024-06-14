import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@/components/ui/Button'
import { WssFunctionNameMessageType } from '@/enums/websocket'
import { websocketSlice } from '@/store/websocket'

export default function Portfolio() {
  const dispatch = useDispatch()

  const logout = useCallback(() => {
    dispatch(
      websocketSlice.actions.send({
        n: WssFunctionNameMessageType.LogOut,
      }),
    )
  }, [dispatch])

  return (
    <div>
      <h1>Portfolio</h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}
