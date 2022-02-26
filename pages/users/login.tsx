import * as React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default () => {
  const [pass, setPass] = React.useState('')
  const [name, setName] = React.useState('')
  const r = useRouter()

  const submit = () => fetch('/api/auth', {
    method: 'POST',
    body: JSON.stringify({ password: pass, username: name })
  }).then(
    res => res.status < 300 ? r.push(`/pastes/by-user/${name}`) : null
  )

  return (
    <>
      <Head>
        <title>Horsebin - Login</title>
      </Head>
      <form onSubmit={e => e.preventDefault()}>
        <input placeholder="Username" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
        <button onClick={submit}>Login</button>
      </form>
    </>
  )
}
