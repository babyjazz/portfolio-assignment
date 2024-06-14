import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { routePathnames } from '@/constants/routesPathName'
import { websocketSelector } from '@/store/websocket'

interface IProtectedRouteProps {
  children: ReactElement
}

export default function ProtectedRoute({ children }: IProtectedRouteProps) {
  const loginResult = useSelector(websocketSelector.wssReceiveData)

  if (!loginResult?.Authenticated) {
    return <Navigate to={routePathnames.login} replace />
  }

  return children
}
