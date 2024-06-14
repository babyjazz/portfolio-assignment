import { portfolioSlice } from './portfolio'
import { websocketSlice } from './websocket'
import { portfolioApi } from '@/services/portfolio'
import { authSlice } from '@/store/authentication'
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
  [portfolioSlice.name]: persistReducer(
    portfolioPersistConfig,
    portfolioSlice.reducer,
  ),
  [portfolioApi.reducerPath]: portfolioApi.reducer,
})

export const serviceMiddleware = [portfolioApi.middleware]

export default rootReducer
