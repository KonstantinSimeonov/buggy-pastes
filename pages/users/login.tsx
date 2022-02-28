import Head from 'next/head'
import {useRouter} from 'next/router'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../../components/Input'

import { Button } from '../../components/Button'

type FormData = Record<'username' | 'password', string>

const ValidationError = ({ msg }: { msg: string | null }) => <span className="text-sm text-red-600 underline">{msg}</span>

export default () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const r = useRouter()

  const submit = handleSubmit(credentials => fetch('/api/auth', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }).then(
    res => res.status < 300 ? r.push(`/pastes/by-user/${credentials.username}`) : null
  ))

  return (
    <div className="flex place-content-center grow">
      <Head>
        <title>Horsebin - Login</title>
      </Head>
      <form className="flex flex-col self-center" onSubmit={submit}>
        <fieldset className="flex flex-col mb-2">
          <legend className="mb-2 text-lg font-bold">Log into your profile</legend>
          <label className="mb-2">
            Username
            <Input {...register('username', { required: true })} />
            {errors.username?.type === `required` ? <ValidationError msg="Username is required" /> : null}
          </label>
          <label className="mb-2">
            Password
            <Input type="password" {...register('password', { required: true })} />
          </label>
        </fieldset>
        <Button disabled={Boolean(errors.password || errors.username)}>Login</Button>
      </form>
    </div>
  )
}
