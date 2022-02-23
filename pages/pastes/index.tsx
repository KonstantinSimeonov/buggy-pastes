import * as to from 'typeorm';
import { Paste } from '../../entities/Paste';
import { initDb } from '../../initializers/database';
import Link from 'next/link'

export const getServerSideProps = async context => {
  await initDb()
  const repo = to.getRepository(Paste)
  const pastes = (await repo.find()).map(p => ({ ...p, createdAt: p.createdAt.toString() }))
  return {
    props: {
      pastes
    }
  }
}

const PasteList = ({ pastes }: ReturnType<typeof getServerSideProps> extends Promise<{ props: infer Props }> ? Props : unknown) => (
  <>
    <h1 className="text-3xl font-bold underline">
      Here do be pastes mon
    </h1>
    <ul>{
      pastes.map(p => <li key={p.id}>{p.content} | created at: {p.createdAt}</li>)
    }</ul>
    <Link href="/">
      <a>Home</a>
    </Link>
  </>
)

export default PasteList
