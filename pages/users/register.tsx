import * as React from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../../components/Button'

type FormData = Record<'username' | 'password', string>

const ValidationError = ({ msg }: { msg: string | null }) => <span className="text-sm text-red-600 underline">{msg}</span>

export default () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const submit = (data: FormData) => fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
  })

  console.log(errors.username?.type)

  return (
    <form className="h-48 w-20 flex flex-col min-h-fit" onSubmit={handleSubmit(submit)}>
      <fieldset className="mb-2 flex flex-col">
        <legend className="mb-2 text-lg font-bold">New Profile</legend>
        <label className="mb-2">
          Username
          <input {...register('username', { required: true, maxLength: 20 })} />
          {errors.username?.type === `required` ? <ValidationError msg="Username is required" /> : null}
          {errors.username?.type === `maxLength` ? <ValidationError msg="Username should be below 20 chars" /> : null}
        </label>
        <label className="mb-2">
          Password
          <input type="password" {...register('password', { required: true, minLength: 8, maxLength: 30 })} />
          {errors.password?.type === `minLength` ? <ValidationError msg="Password must be at least 8 chars" /> : null}
        </label>
      </fieldset>
      <Button disabled={Boolean(errors.password || errors.username)}>Register</Button>
    </form>
  )
}
