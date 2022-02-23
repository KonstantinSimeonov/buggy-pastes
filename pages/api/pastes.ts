// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getRepository } from 'typeorm';
import { Paste } from '../../entities/Paste';
import { initDb } from '../../initializers/database';
import {getUser} from '../../lib/auth';
import { withAuth } from '../../lib/middleware/withAuth'

type CreatedPaste = {
  id: string
}

const handler = withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreatedPaste>
) {
  await initDb()
  const p = new Paste()
  p.content = req.body.content
  p.user = await getUser(req.cookies.accessToken)
  await getRepository(Paste).save(p)
  res.status(201).json({ id: p.id })
})

export default handler
