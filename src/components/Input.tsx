import React from 'react'

interface InputProps {
  id: string
  name?: string
  type?: string
  value: string
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  placeholder,
  type = 'text',
  value,
  onChange,
  className,
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
    />
  )
}

export default Input
