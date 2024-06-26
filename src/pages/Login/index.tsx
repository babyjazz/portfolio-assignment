import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { routePathnames } from '@/constants/routesPathName'
import { WssFunctionNameMessageType } from '@/enums/websocket'
import { authSelectors } from '@/store/authentication'
import { websocketSlice } from '@/store/websocket'

interface ILoginForm {
  Username: string
  Password: string
}

export default function Login() {
  const dispatch = useDispatch()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginForm>({
    defaultValues: {
      Username: '',
      Password: '',
    },
  })
  const loginResult = useSelector(authSelectors.auth)

  const sendMessage = useCallback(
    (msg: ILoginForm) => {
      dispatch(
        websocketSlice.actions.send({
          n: WssFunctionNameMessageType.AuthenticateUser,
          o: JSON.stringify(msg),
        }),
      )
    },
    [dispatch],
  )

  const onSubmit = (values: ILoginForm) => {
    sendMessage(values)
  }

  if (loginResult?.Authenticated) {
    return <Navigate to={routePathnames.portfolio} />
  }
  return (
    <div className="m-auto flex h-screen w-[537px] items-center">
      <div className="w-full rounded border-[1px] border-theme-default bg-transparent p-6">
        <h1>Log Into Bitazza Global</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="mt-10 flex flex-col">
            <label>Email</label>
            <Controller
              control={control}
              name="Username"
              rules={{
                required: 'Please enter your email address to log in',
                pattern: {
                  value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g,
                  message: 'Please enter a valid email',
                },
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  onChange={onChange}
                  errors={errors.Username?.message}
                />
              )}
            />
          </div>

          <div className="flex flex-col">
            <label>Password</label>
            <Controller
              control={control}
              rules={{
                required: 'Please enter your password address to log in',
              }}
              name="Password"
              render={({ field: { value, onChange } }) => (
                <Input
                  type="password"
                  value={value}
                  onChange={onChange}
                  errors={errors.Password?.message}
                />
              )}
            />
          </div>

          {loginResult?.errormsg && (
            <span className="text-red-100">{loginResult.errormsg}</span>
          )}

          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  )
}
