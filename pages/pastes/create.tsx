import type { NextPage } from 'next'
import Link from 'next/link'
import * as React from 'react'

const CreatePaste: NextPage = () => {
  const [content, setContent] = React.useState('')
  const create = () => {
    fetch(`/api/pastes`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    })
  }
  return (
    <>
      <h2>New paste</h2>
      <textarea value={content} onChange={e => setContent(e.target.value)}>
      </textarea>
      <button onClick={create}>Create</button>
      <Link href="/">
        <a>Home</a>
      </Link>
    </>
  )
}

export default CreatePaste
