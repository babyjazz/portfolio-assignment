import { IAuthState } from './slice'
import { RootState } from '@/store'

export const auth = (state: RootState): IAuthState['data'] =>
  state.authentication.data

export const authMeta = (state: RootState): IAuthState => state.authentication
