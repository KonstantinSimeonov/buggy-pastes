import Link from 'next/link'
import {useRouter} from 'next/router'

export const AppLink = ({ children, className = ``, ...rest }: Parameters<typeof Link>[0] & { className?: string; }) => {
  const r = useRouter()
  return <Link {...rest}><a className={`p-6 hover:text-white hover:bg-purple-600 font-bold ${className} ${
    rest.href === r.asPath ? 'bg-purple-600' : ''
  }`}>{children}</a></Link>
}
