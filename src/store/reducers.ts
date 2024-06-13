import { authenticationSlice } from './authentication/slice'
import { websocketSlice } from '@/store/websocket/slice'
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const authenticationPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  [authenticationSlice.name]: persistReducer(
    authenticationPersistConfig,
    authenticationSlice.reducer,
  ),
  [websocketSlice.name]: websocketSlice.reducer,
})

export const serviceMiddlewares = [].concat()

export default rootReducer
