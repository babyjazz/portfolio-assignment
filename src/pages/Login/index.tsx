import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { routePathnames } from '@/constants/routesPathName'
import { websocketSelector, websocketSlice } from '@/store/websocket'

interface ILoginForm {
  Username: string
  Password: string
}

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm<ILoginForm>()
  const loginResult = useSelector(websocketSelector.wssReceiveData)

  const sendMessage = useCallback(
    (msg: ILoginForm) => {
      dispatch(
        websocketSlice.actions.send({
          n: 'AuthenticateUser',
          o: JSON.stringify(msg),
        }),
      )
    },
    [dispatch],
  )

  const onSubmit = (values: ILoginForm) => {
    sendMessage(values)
  }

  useEffect(() => {
    if (loginResult?.Authenticated) {
      navigate(routePathnames.portfolio)
    }
  }, [loginResult])

  return (
    <div>
      <h1>Login</h1>
      <Link to={routePathnames.index}>home</Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('Username')} />
        <input {...register('Password')} />
        {loginResult?.errormsg && (
          <span className="text-red-400">{loginResult.errormsg}</span>
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
