import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { routePathnames } from '@/constants/routesPathName'
import { authSelectors } from '@/store/authentication'

interface IProtectedRouteProps {
  children: ReactElement
}

export default function ProtectedRoute({ children }: IProtectedRouteProps) {
  const loginResult = useSelector(authSelectors.auth)

  if (!loginResult?.Authenticated) {
    return <Navigate to={routePathnames.login} replace />
  }

  return children
}
