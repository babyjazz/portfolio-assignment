import marketsData from '@/__mocks__/markets.json'
import { IMarket } from '@/types/markets'
import { baseQuery } from '@/utils/baseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const marketsApi = createApi({
  reducerPath: 'marketsApi',
  baseQuery,
  endpoints: (builder) => ({
    getMarkets: builder.query<IMarket[], void>({
      query: () => ({ url: '/GetLevel1SummaryMin?OMSId=1' }),
      transformResponse: () => {
        /** NOTE: Due to this data returned from API is bug. so I'll fix by mocking it */
        return marketsData.map((o) => ({
          id: o[0],
          name: o[1],
          price: o[2],
          change: o[3],
          percentChange: o[4],
        })) as IMarket[]
      },
    }),
  }),
})

export const { useGetMarketsQuery } = marketsApi
