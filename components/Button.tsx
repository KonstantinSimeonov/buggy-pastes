export const Button = ({ className = ``, ...props }: React.HTMLProps<HTMLButtonElement>) => (
  <button {...props as any} className={`${className} text-white text-bold p-2 test-base rounded-sm bg-purple-600`} />
)
