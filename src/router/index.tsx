import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routePathnames } from '@/constants/routesPathName'
import NotFoundPage from '@/pages/404'
import Home from '@/pages/Home'
import Login from '@/pages/Login'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routePathnames.index} element={<Home />} />
        <Route path={routePathnames.login} element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
