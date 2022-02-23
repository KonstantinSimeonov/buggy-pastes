import * as jwt from 'jsonwebtoken'
import {getRepository} from 'typeorm'
import { User } from '../entities/User'
import {initDb} from '../initializers/database'

type Claims = {
  exp: number;
  username: string;
  id: string;
}

export const genToken = (u: User) => {
  const t = jwt.sign({
    exp: (Date.now() / 1000 | 0) + 60 * 60,
    username: u.username,
    id: u.id
  } as Claims, 'tinkywinky')

  return t
}

export const verifyAuth = (accessToken: string) =>
  new Promise<Claims>((resolve, reject) => 
    jwt.verify(accessToken, 'tinkywinky', (err, decoded) =>
      err ? reject(err) : resolve(decoded as Claims)
    )
  )

export const getUser = async (accessToken: string) => {
  try {
    const { id } = await verifyAuth(accessToken)
    await initDb()
    const repo = getRepository(User)

    const u = await repo.findOne({ id })
    return u || null
  } catch(err) {
    return null
  }
}
