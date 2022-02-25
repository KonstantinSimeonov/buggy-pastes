import * as React from 'react'
import useSWR from 'swr'
import type { User } from '../entities/User'

type Session = Omit<{ [k in keyof User]: User[k] }, 'addId' | 'pastes'>

export const AuthContext = React.createContext({
  user: undefined as undefined | Session,
})

export const AuthProvider: React.FC = ({ children }) => {
  const { data: user } = useSWR<Session>(
    '/api/me',
    (url: string) => fetch(url).then(res => res.status < 400 ? res.json() : undefined)
  )
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export const useAuth = () => React.useContext(AuthContext)
