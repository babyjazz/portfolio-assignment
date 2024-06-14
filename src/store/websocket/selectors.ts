import { RootState } from '@/store'
import { IAuth } from '@/types/authentication'

export const wss = (state: RootState) => state.wss
export const wssReceiveData = (state: RootState): IAuth => state.wss.receive?.o
