import * as React from 'react'

export default () => {
  const [pass, setPass] = React.useState('')
  const [name, setName] = React.useState('')

  const submit = () => fetch('/api/auth', {
    method: 'POST',
    body: JSON.stringify({ password: pass, username: name })
  })

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input placeholder="Username" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
      <button onClick={submit}>Login</button>
    </form>
  )
}
