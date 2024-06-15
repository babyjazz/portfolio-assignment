import { portfolioSlice } from './portfolio'
import { marketsApi } from '@/services/markets'
import { authSlice } from '@/store/authentication'
import { summaryLevel1Slice } from '@/store/summaryLevel1'
import { websocketSlice } from '@/store/websocket'
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const authenticationPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['data'],
}

const portfolioPersistConfig = {
  key: 'portfolio',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  [authSlice.name]: persistReducer(
    authenticationPersistConfig,
    authSlice.reducer,
  ),
  [websocketSlice.name]: websocketSlice.reducer,
  [summaryLevel1Slice.name]: summaryLevel1Slice.reducer,
  [marketsApi.reducerPath]: marketsApi.reducer,
  [portfolioSlice.name]: persistReducer(
    portfolioPersistConfig,
    portfolioSlice.reducer,
  ),
})

export const serviceMiddleware = [marketsApi.middleware]

export default rootReducer
