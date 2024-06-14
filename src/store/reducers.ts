import { websocketSlice } from './websocket'
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

const rootReducer = combineReducers({
  [authSlice.name]: persistReducer(
    authenticationPersistConfig,
    authSlice.reducer,
  ),
  [websocketSlice.name]: websocketSlice.reducer,
})

export const serviceMiddlewares = [].concat()

export default rootReducer
