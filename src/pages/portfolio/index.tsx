import AddAssetForm from '@/components/AddAssetsForm'
import MarketTable from '@/components/MarketTable'

export default function Portfolio() {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-4">
        <h1>Portfolio</h1>
        <AddAssetForm />
      </div>

      <div className="flex flex-col gap-4">
        <h1>Markets</h1>
        <MarketTable />
      </div>
    </div>
  )
}
