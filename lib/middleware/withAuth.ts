import * as next from 'next'
import { verifyAuth } from '../../lib/auth'

export const withAuth = <T extends any>(fn: next.NextApiHandler<T>): next.NextApiHandler<T> =>
  (req, res, ...args) => {
    const { accessToken } = req.cookies
    if (!accessToken) {
      res.status(401).end()
      return
    }

    return verifyAuth(accessToken)
      .catch(err => res.status(400).json(err))
      .then(() => fn(req, res, ...args))
  }
