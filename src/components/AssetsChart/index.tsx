import { useMemo } from 'react'
import { Pie } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { portfolioSelectors } from '@/store/portfolio'
import { IMarket } from '@/types/markets'
import { stringToRGB } from '@/utils/stringToRGB'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  responsive: true,
}

interface IAssetChartProps {
  data: IMarket[]
}

export default function AssetsChart({ data }: IAssetChartProps) {
  const portfolio = useSelector(portfolioSelectors.portfolio)

  const chartData = useMemo(() => {
    const _data: number[] = []
    const bgColors: string[] = []
    data.forEach((m) => {
      _data.push(m.price)
      bgColors.push(stringToRGB(m.name))
    })
    return {
      labels: portfolio,
      datasets: [
        {
          data: _data,
          backgroundColor: bgColors,
          borderColor: bgColors,
          borderWidth: 1,
        },
      ],
    }
  }, [data, portfolio])

  return (
    <div className="mx-auto flex w-fit flex-col items-end gap-8">
      <span>Balance: 99,999</span>
      <Pie data={chartData} options={options} />
    </div>
  )
}
