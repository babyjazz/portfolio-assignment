import { IS_DEV } from '@/constants/env'
import { websocketMiddleware } from '@/store/middlewares/websocket'
import rootReducer, { serviceMiddleware } from '@/store/reducers'
import { configureStore } from '@reduxjs/toolkit'
import { PERSIST, REGISTER, persistStore } from 'redux-persist'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REGISTER, PERSIST],
      },
    })
      .concat(serviceMiddleware)
      .concat(websocketMiddleware),
  devTools: IS_DEV,
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState> // Might require additional configuration
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T extends string = string, P = unknown> = {
  type: T
  payload: P
}
