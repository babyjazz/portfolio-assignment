import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { routePathnames } from '@/constants/routesPathName'
import { websocketSlice } from '@/store/websocket/slice'

export default function Login() {
  const dispatch = useDispatch()

  const connectWss = useCallback(() => {
    dispatch(
      websocketSlice.actions.connect(
        'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
      ),
    )
  }, [dispatch])

  const sendMsg = useCallback(() => {
    dispatch(websocketSlice.actions.send('hi'))
  }, [dispatch])

  return (
    <div>
      <h1>Login</h1>
      <Link to={routePathnames.index}>home</Link>
      <button onClick={connectWss}>connect</button>
      <button onClick={sendMsg}>send message</button>
    </div>
  )
}
