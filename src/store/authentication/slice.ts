import { IAuth, IAuthError } from '@/types/authentication'
import { createSlice } from '@reduxjs/toolkit'

export interface IAuthState {
  data: IAuth | null
  error: IAuthError | null
}

const initialState: IAuthState = {
  data: null,
  error: null,
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    auth(_, action) {
      return { ...initialState, data: action.payload }
    },
    error(_, action) {
      return { ...initialState, error: action.payload }
    },
    logout() {
      return initialState
    },
  },
})

export default authenticationSlice
