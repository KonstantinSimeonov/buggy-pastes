import type { NextPage } from 'next'
import Link from 'next/link'
import * as React from 'react'

const CreatePaste: NextPage = () => {
  const [state, setState] = React.useState({
    content: '',
    title: undefined as string | undefined,
    language: undefined as string | undefined
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setState(
      st => ({ ...st, [event.target.name]: event.target.value })
    )
  const create = () => {
    fetch(`/api/pastes`, {
      method: 'POST',
      body: JSON.stringify(state),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    })
  }
  return (
    <>
      <h2>New paste</h2>
      <input placeholder="title" name="title" value={state.title} onChange={handleChange} />
      <input placeholder="lang" name="language" value={state.language} onChange={handleChange} />
      <textarea name="content" value={state.content} onChange={handleChange} />
      <button onClick={create}>Create</button>
      <Link href="/">
        <a>Home</a>
      </Link>
    </>
  )
}

export default CreatePaste
