import Link from 'next/link'

export const AppLink: Link = ({ children, className = ``, ...rest }) => {
  const cn = `p-6 hover:text-white hover:bg-purple-600 font-bold ${className}`
  return <Link {...rest}><a className={cn}>{children}</a></Link>
}
