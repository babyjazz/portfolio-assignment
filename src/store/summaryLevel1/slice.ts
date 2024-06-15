import { ISummaryLevel1 } from '@/types/summaryLevel1'
import { createSlice } from '@reduxjs/toolkit'

const initialState: ISummaryLevel1 | null = null

const summaryLevel1Slice = createSlice({
  name: 'summaryLevel1',
  initialState,
  reducers: {
    setSummaryLevel1(_, action) {
      return action.payload
    },
  },
})

export default summaryLevel1Slice
