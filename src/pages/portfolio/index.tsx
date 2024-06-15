import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import AddAssetForm from '@/components/AddAssetsForm'
import AssetsChart from '@/components/AssetsChart'
import AssetsTable from '@/components/AssetsTable'
import { useGetMarketsQuery } from '@/services/markets'
import { portfolioSelectors } from '@/store/portfolio'
import { IMarket } from '@/types/markets'

export default function Portfolio() {
  const portfolio = useSelector(portfolioSelectors.portfolio)
  const { data: markets = [] } = useGetMarketsQuery(undefined, {
    pollingInterval: 5000,
  })

  const portfolioMarkets = useMemo(() => {
    if (portfolio?.length > 0 && markets?.length > 0) {
      const _portfolioMarkets: IMarket[] = []
      portfolio.forEach((o) => {
        const market = markets.find(
          (m) => m.name?.toLowerCase() === o.toLowerCase(),
        )
        if (market) _portfolioMarkets.push(market)
      })
      return _portfolioMarkets
    }
    return []
  }, [portfolio, markets])

  return (
    <div className="m-auto flex max-w-[1600px] flex-col gap-14">
      <div className="bg flex w-full flex-col gap-4">
        <h1>Portfolio</h1>
        <AddAssetForm />
        <div className="grid w-full grid-cols-1 gap-24 md:grid-cols-[auto_384px]">
          <AssetsTable data={portfolioMarkets} />
          <AssetsChart data={portfolioMarkets} />
        </div>
      </div>
    </div>
  )
}
