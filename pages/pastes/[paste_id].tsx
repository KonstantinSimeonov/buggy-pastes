import * as React from 'react'
import {GetServerSideProps} from "next"
import {getRepository} from "typeorm"
import {Paste} from "../../entities/Paste"
import {initDb} from "../../initializers/database"
import Prism from 'prismjs'
import '../../node_modules/prismjs/themes/prism.min.css'

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

const PasteById = ({ paste }: CSP<typeof getServerSideProps>) => {

  React.useEffect(() => {
    console.log('BRRR')
    Prism.manual = true
    Prism.highlightAll()
  }, [])

  return (
    <div className="Code">
      {paste.title ? <h2>{paste.title}</h2> : null}
      {paste.language ? <p>Lang: {paste.language}</p> : null}
      <pre className={`language-${paste.language}`}>
        <code>
          {paste.content}
        </code>
      </pre>
    </div>
  )
}

export default PasteById
