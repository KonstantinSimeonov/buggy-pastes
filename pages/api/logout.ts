import type { NextApiRequest, NextApiResponse } from 'next'

export default  (
  req: NextApiRequest,
  res: NextApiResponse
) => res
  .setHeader('Set-Cookie', `accessToken=''; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`)
  .redirect(`/`)
