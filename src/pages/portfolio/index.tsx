import { useSelector } from 'react-redux'
import { portfolioSelectors } from '@/store/portfolio'

export default function Portfolio() {
  const portfolio = useSelector(portfolioSelectors.portfolio)

  return (
    <div>
      <h1>Portfolio</h1>
    </div>
  )
}
