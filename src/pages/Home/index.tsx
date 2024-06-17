import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { routePathnames } from '@/constants/routesPathName'

export default function Home() {
  const navigate = useNavigate()

  const goToLogin = () => {
    navigate(routePathnames.login)
  }

  return (
    <div className="flex h-[60vh] w-screen flex-col items-center justify-center gap-4">
      <h1>Welcome to Bitazza global</h1>
      <Button onClick={goToLogin}>Login</Button>
    </div>
  )
}
