import type { NextApiRequest, NextApiResponse } from 'next'
import { initDb } from '../../initializers/database';
import { getUser } from '../../lib/auth';
import { withAuth } from '../../lib/middleware/withAuth'

const handler = withAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initDb()
  console.log('token' + req.cookies.accessToken)
  const me = await getUser(req.cookies.accessToken)
  me ? res.status(200).json(me) : res.status(404).end()
})

export default handler
