import type { NextApiRequest, NextApiResponse } from 'next'

export default  (
  req: NextApiRequest,
  res: NextApiResponse
) => res
  .setHeader('Set-Cookie', `accessToken=''; HttpOnly; Mag-Age=86400; Path=/`)
  .redirect(`/`)
