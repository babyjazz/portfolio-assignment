import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import ProtectedRoute from '@/components/ProtectedRoute'
import { WEBSOCKET_URL } from '@/constants/env'
import { routePathnames } from '@/constants/routesPathName'
import NotFoundPage from '@/pages/404'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Portfolio from '@/pages/portfolio'
import { websocketSlice } from '@/store/websocket'

export default function Router() {
  const dispatch = useDispatch()

  const connectWss = useCallback(() => {
    dispatch(websocketSlice.actions.connect(WEBSOCKET_URL))
  }, [dispatch])

  useEffect(() => {
    connectWss()
  }, [connectWss])

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routePathnames.login} element={<Login />} />
        <Route path="" element={<Navbar />}>
          <Route path={routePathnames.index} element={<Home />} />
          <Route
            path={routePathnames.portfolio}
            element={
              <ProtectedRoute>
                <Portfolio />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
