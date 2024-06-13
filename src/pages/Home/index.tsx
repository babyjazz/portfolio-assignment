import { Link } from 'react-router-dom'
import { routePathnames } from '@/constants/routesPathName'

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to={routePathnames.login}>login</Link>
    </div>
  )
}
