import * as React from 'react'
import {GetServerSideProps} from "next"
import {getRepository} from "typeorm"
import {Paste} from "../../../entities/Paste"
import {initDb} from "../../../initializers/database"
import Prism from 'prismjs'
import { Button } from '../../../components/Button'
import Head from 'next/head'
import '../../../node_modules/prismjs/themes/prism.min.css'
import { useAuth } from '../../../lib/AuthContext'

export const getServerSideProps = async (context: any) => {
  const id = context.query.paste_id as string

  await initDb()
  const p = await getRepository(Paste).findOne({ id })

  return {
    props: {
      paste: { ...p, createdAt: p?.createdAt.toString() || null }
    }
  }
}

type CSP<T extends GetServerSideProps> = ReturnType<T> extends Promise<{ props: infer Props }> ? Props : never

type PasteProps = CSP<typeof getServerSideProps>

const PasteDetails = ({ paste }: PasteProps) => {
  const [mode, setMode] = React.useState('view' as 'view' | 'edit')
  const { user } = useAuth()
  console.log(user, paste)

  if (mode === 'edit') return (
    <EditPaste paste={paste}>
      <Button onClick={() => setMode('view')}>Cancel</Button>
    </EditPaste>
  )

  return (
    <PasteById paste={paste}>
      {
        user?.id === paste.userId ? <Button onClick={() => setMode('edit')}>Edit</Button>: null
      }
    </PasteById>
  )
}

const EditPaste = ({ paste, children }: PasteProps) => {
  const [state, setState] = React.useState({
    content: paste.content,
    title: paste.title as string | undefined,
    language: paste.language as string | undefined
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setState(
      st => ({ ...st, [event.target.name]: event.target.value })
    )
  const edit = () => {
    fetch(`/api/pastes`, {
      method: 'PUT',
      body: JSON.stringify({ ...state, id: paste.id }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    }).then(res => res.status < 300 ? res.json() : Promise.reject(res.json()))
  }


  return (
    <>
      <Head>
        <title>Horsebin - Edit paste</title>
      </Head>
      <h2>New paste</h2>
      <input placeholder="title" name="title" value={state.title} onChange={handleChange} />
      <input placeholder="lang" name="language" value={state.language} onChange={handleChange} />
      <textarea name="content" value={state.content} onChange={handleChange} />
      <Button onClick={edit}>Save</Button>
      {children}
    </>
  )
}

const PasteById = ({ children, paste }: PasteProps) => {

  React.useEffect(() => {
    console.log('BRRR')
    Prism.manual = true
    Prism.highlightAll()
  }, [])

  return (
    <div>
      <div className="Code">
        {paste.title ? <h2>{paste.title}</h2> : null}
        {paste.language ? <p>Lang: {paste.language}</p> : null}
        <pre className={`language-${paste.language}`}>
          <code>
            {paste.content}
          </code>
        </pre>
      </div>
      {children}
    </div>
  )
}

export default PasteDetails
