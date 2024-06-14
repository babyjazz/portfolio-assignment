import { RootState } from '@/store'
import { IAuthentication } from '@/types/authentication'

export const wss = (state: RootState) => state.wss
export const wssReceiveData = (state: RootState): IAuthentication =>
  state.wss.receive?.o
