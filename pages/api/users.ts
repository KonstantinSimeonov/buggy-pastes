// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getRepository } from 'typeorm'
import { User } from '../../entities/User'
import { initDb } from '../../initializers/database'
import * as crypto from 'crypto'

type CreatedUser = {
  id: string
}

const genSalt = () => crypto.randomBytes(10).toString('hex')
const saltPass = (pass: string, salt: string) => crypto.createHmac('sha512', salt).update(pass).digest('hex')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreatedUser>
) {
  await initDb()
  const repo = getRepository(User)
  const u = new User()
  const body = req.body as { username: string; password: string }
  const salt = genSalt()
  const saltedPass = saltPass(body.password, salt)
  u.salt = salt
  u.password = saltedPass
  u.username = body.username
  
  await repo.save(u)
  res.status(201).json({ id: u.id })
}
