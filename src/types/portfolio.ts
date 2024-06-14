export interface IPortfolio {
  OMSId: number
  InstrumentId: number
  BestBid: number
  BestOffer: number
  LastTradedPx: number
  LastTradedQty: number
  LastTradeTime: number
  SessionOpen: number
  SessionHigh: number
  SessionLow: number
  SessionClose: number
  Volume: number
  CurrentDayVolume: number
  CurrentDayNotional: number
  CurrentDayNumTrades: number
  CurrentDayPxChange: number
  Rolling24HrVolume: number
  Rolling24HrNotional: number
  Rolling24NumTrades: number
  Rolling24HrPxChange: number
  TimeStamp: string
  BidQty: number
  AskQty: number
  BidOrderCt: number
  AskOrderCt: number
  Rolling24HrPxChangePercent: number
}
