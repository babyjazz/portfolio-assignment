import portfolioData from '@/__mocks__/portfolio.json'
import { IPortfolioApi } from '@/types/portfolio'
import { baseQuery } from '@/utils/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const portfolioApi = createApi({
  reducerPath: 'portfolioApi',
  baseQuery,
  endpoints: (builder) => ({
    getPortfolio: builder.query<IPortfolioApi[], void>({
      query: () => ({ url: '/GetLevel1SummaryMin?OMSId=1' }),
      transformResponse: () => {
        /** NOTE: Due to this data returned from API is bug. so I'll fix by mocking it */
        return portfolioData.map((o) => ({
          id: o[0],
          name: o[1],
          price: o[2],
          change: o[3],
          percentChange: o[4],
        })) as IPortfolioApi[]
      },
    }),
  }),
})

export const { useGetPortfolioQuery } = portfolioApi
