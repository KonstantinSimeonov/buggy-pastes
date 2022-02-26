import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import * as React from 'react'

const CreatePaste: NextPage = () => {
  const [state, setState] = React.useState({
    content: '',
    title: undefined as string | undefined,
    language: undefined as string | undefined
  })

  const r = useRouter()

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
    }).then(res => res.status < 300 ? res.json() : Promise.reject(res.json()))
      .then(data => r.push(`/pastes/${data.id}`)

    )
  }


  return (
    <>
      <Head>
        <title>Horsebin - Create paste</title>
      </Head>
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
