import 'reflect-metadata'
import { Connection, createConnection, getConnectionOptions, getConnection } from 'typeorm'
import { Paste } from '../entities/Paste'
import { User } from '../entities/User'

export const initDb = async (overrides: Record<string, any> = {}): Promise<Connection> => {
  const opts = await getConnectionOptions()
  try {
    const st = getConnection()
    await st.close()
  } catch (e) {
    console.log('no connection to clean up')
  }
  return createConnection({
    ...opts,
    entities: [Paste, User],
    migrations: [__dirname + '/migrations/*.ts'],
    ...overrides
  })
}
