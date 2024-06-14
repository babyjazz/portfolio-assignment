import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router'
import Button from '../ui/Button'
import { Logo } from '@/constants/images'
import { WssFunctionNameMessageType } from '@/enums/websocket'
import { websocketSlice } from '@/store/websocket'

export default function Navbar() {
  const dispatch = useDispatch()

  const logout = useCallback(() => {
    dispatch(
      websocketSlice.actions.send({
        n: WssFunctionNameMessageType.LogOut,
      }),
    )
  }, [dispatch])

  return (
    <>
      <div className="bg-black-200 flex h-[72px] items-center justify-between p-5">
        <img src={Logo} className="h-10" />
        <Button onClick={logout}>Logout</Button>
      </div>

      <div className="px-8 py-5">
        <Outlet />
      </div>
    </>
  )
}
