import {GetServerSideProps} from "next"
import {useRouter} from "next/router"
import {getRepository} from "typeorm"
import {User} from "../../../entities/User"
import {initDb} from "../../../initializers/database"

export const getServerSideProps = async context => {
  const username = context.query.username as string

  await initDb()
  const u = await getRepository(User).findOne({ username }, { relations: ['pastes'] })

  return {
    props: {
      pastes: u?.pastes.map(({ createdAt, ...rest }) => rest) || []
    }
  }
}

type CSP<T extends GetServerSideProps> = ReturnType<T> extends Promise<{ props: infer Props }> ? Props : never

const PasteByUserId = ({ pastes = [] }: CSP<typeof getServerSideProps>) => {
  const { username } = useRouter().query

  return (
    <div>
      <h2>{username}</h2>
      <ul>
        {pastes.map(p => <li key={p.id}>{p.content}</li>)}
      </ul>
    </div>
  )
}

export default PasteByUserId
