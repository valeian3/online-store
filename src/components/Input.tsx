import React from 'react'

interface InputProps {
  id: string
  name?: string
  type?: string
  value: string
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  required?: boolean
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  placeholder,
  type = 'text',
  value,
  onChange,
  className,
  required,
}) => {
  const inputStyles =
    type === 'number'
      ? {
          WebkitAppearance: 'none' as const,
          MozAppearance: 'textfield' as const,
        }
      : {}

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      className={`block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-primary-600 ${className}`}
      style={inputStyles}
    />
  )
}

export default Input
