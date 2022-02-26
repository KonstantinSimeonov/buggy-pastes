import * as to from 'typeorm';
import { Paste } from '../../entities/Paste';
import { initDb } from '../../initializers/database';
import Link from 'next/link'
import Head from 'next/head'

export const getServerSideProps = async context => {
  await initDb()
  const repo = to.getRepository(Paste)
  const pastes = (await repo.find({ take: 10, order: { createdAt: 'DESC' } })).map(p => ({ ...p, createdAt: p.createdAt.toString() }))
  return {
    props: {
      pastes
    }
  }
}

const PasteList = ({ pastes }: ReturnType<typeof getServerSideProps> extends Promise<{ props: infer Props }> ? Props : unknown) => (
  <>
    <Head>
      <title>Horsebin - Recent Pastes</title>
    </Head>
    <h1 className="text-3xl font-bold underline">
      Here do be pastes mon
    </h1>
    <ul>{
      pastes.map(
        p => (
          <li key={p.id}>
            <Link href={`/pastes/${p.id}`}>
              <a>{p.content.slice(0, 20)}... {p.language || ''}</a>
            </Link>
          </li>
        )
      )
    }</ul>
    <Link href="/">
      <a>Home</a>
    </Link>
  </>
)

export default PasteList
