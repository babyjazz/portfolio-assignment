import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { Logo } from '@/constants/images'
import { routePathnames } from '@/constants/routesPathName'
import { WssFunctionNameMessageType } from '@/enums/websocket'
import { websocketSlice } from '@/store/websocket'
import { cn } from '@/utils/classname'

const menus = [
  {
    label: 'Portfolio',
    link: routePathnames.portfolio,
  },
  {
    label: 'Market',
    link: routePathnames.markets,
  },
]

export default function Navbar() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  const logout = useCallback(() => {
    dispatch(
      websocketSlice.actions.send({
        n: WssFunctionNameMessageType.LogOut,
      }),
    )
  }, [dispatch])

  return (
    <>
      <div className="flex h-[72px] items-center justify-between bg-black-200 p-5">
        <div className="flex items-center gap-4">
          <img src={Logo} className="h-10" />
          {menus.map((menu) => (
            <Link
              to={menu.link}
              className={cn('text-theme-primary', {
                'text-primary': menu.link === pathname,
              })}
            >
              {menu.label}
            </Link>
          ))}
        </div>

        <Button onClick={logout}>Logout</Button>
      </div>

      <div className="px-8 py-5">
        <Outlet />
      </div>
    </>
  )
}
