import { IS_DEV } from '@/constants/env'
import { websocketMiddleware } from '@/store/middlewares/websocket'
import rootReducer from '@/store/reducers'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
  devTools: IS_DEV,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState> // Might require additional configuration
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T extends string = string, P = unknown> = {
  type: T
  payload: P
}
