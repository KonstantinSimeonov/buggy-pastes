import type { NextApiRequest, NextApiResponse } from 'next'
import { getRepository } from 'typeorm'
import { User } from '../../entities/User'
import { initDb } from '../../initializers/database'
import * as crypto from 'crypto'
import { genToken } from '../../lib/auth'

type CreatedUser = {
  jwt: string
}

const saltPass = (pass: string, salt: string) => crypto.createHmac('sha512', salt).update(pass).digest('hex')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreatedUser>
) {
  await initDb()
  const repo = getRepository(User)
  const body = JSON.parse(req.body) as { username: string; password: string }
  const u = await repo.findOne({ username: body.username })
  if (!u) {
    res.status(404).end()
    return
  }

  const saltedPass = saltPass(body.password, u.salt)
  if (saltedPass !== u.password) {
    res.status(400).end()
    return
  }

  res.setHeader('Set-Cookie', `accessToken=${genToken(u)}; HttpOnly; Mag-Age=86400; Path=/`)

  res.status(200).end()
}
