import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { WssFunctionNameMessageType } from '@/enums/websocket'
import { portfolioSelectors } from '@/store/portfolio'
import { websocketSlice } from '@/store/websocket'

export default function Portfolio() {
  const dispatch = useDispatch()
  const { isConnected } = useSelector(websocketSlice.selectSlice)
  // const portfolio = useSelector(portfolioSelectors.portfolio)

  const getLevel1Sumamry = useCallback(() => {
    dispatch(
      websocketSlice.actions.send({
        n: WssFunctionNameMessageType.GetLevel1Summary,
        o: JSON.stringify({ OMSId: 1 }),
      }),
    )
  }, [dispatch])

  useEffect(() => {
    console.log('debug #11')
    if (isConnected) {
      getLevel1Sumamry()
    }
  }, [getLevel1Sumamry, isConnected])

  return (
    <div>
      <h1>Portfolio</h1>
    </div>
  )
}
