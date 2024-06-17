import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { Logo } from '@/constants/images'
import { routePathnames } from '@/constants/routesPathName'
import { WssFunctionNameMessageType } from '@/enums/websocket'
import { authSelectors } from '@/store/authentication'
import { websocketSlice } from '@/store/websocket'
import { cn } from '@/utils/classname'

const menus = [
  {
    key: 'portfolio',
    label: 'Portfolio',
    link: routePathnames.portfolio,
  },
  {
    key: 'market',
    label: 'Market',
    link: routePathnames.markets,
  },
]

export default function Navbar() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const auth = useSelector(authSelectors.auth)

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
          <Link to={routePathnames.index}>
            <img src={Logo} className="h-10" />
          </Link>
          {menus.map((menu) => (
            <Link
              key={menu.key}
              to={menu.link}
              className={cn('text-theme-primary', {
                'text-primary': menu.link === pathname,
              })}
            >
              {menu.label}
            </Link>
          ))}
        </div>

        {auth?.Authenticated && <Button onClick={logout}>Logout</Button>}
      </div>

      <div className="px-8 py-5">
        <Outlet />
      </div>
    </>
  )
}
