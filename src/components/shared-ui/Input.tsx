import { FC, InputHTMLAttributes } from 'react'

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  type = 'text',
  className,
  ...rest
}) => {
  return (
    <input
      type={type}
      className={`w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-primary-600 ${className}`}
      {...rest}
    />
  )
}

export default Input
