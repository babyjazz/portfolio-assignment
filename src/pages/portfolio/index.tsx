import AddAssetForm from '@/components/AddAssetsForm'
import AssetsChart from '@/components/AssetsChart'
import AssetsTable from '@/components/AssetsTable'

export default function Portfolio() {
  return (
    <div className="flex max-w-[1024px] flex-col gap-14">
      <div className="bg flex w-full flex-col gap-4">
        <h1>Portfolio</h1>
        <AddAssetForm />
        <div className="grid grid-cols-[70%_30%] gap-6">
          <AssetsTable />
          <AssetsChart />
        </div>
      </div>
    </div>
  )
}
