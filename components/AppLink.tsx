import Link from 'next/link'

export const AppLink = ({ children, className = ``, ...rest }: Parameters<typeof Link>[0] & { className?: string; }) => {
  const cn = `p-6 hover:text-white hover:bg-purple-600 font-bold ${className}`
  return <Link {...rest}><a className={cn}>{children}</a></Link>
}
