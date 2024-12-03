import { FC, ReactNode } from 'react'

interface CustomButtonProps {
  type?: 'button' | 'submit' | 'reset'
  color?: 'default' | 'dark' | 'green' | 'red' | 'yellow' | 'purple'
  onClick?: () => void
  children: ReactNode
  className?: string
}

const CustomButton: FC<CustomButtonProps> = ({
  type = 'button',
  color = 'default',
  onClick,
  children,
  className,
}) => {
  const buttonClasses = {
    default:
      'text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800',
    dark: 'text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800',
    green:
      'text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800',
    red: 'text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900',
    yellow:
      'text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900',
    purple:
      'text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900',
  }

  return (
    <button
      type={type}
      className={`rounded-lg px-4 py-2 text-center text-sm font-medium ${buttonClasses[color]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default CustomButton
