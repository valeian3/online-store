import { FC, SelectHTMLAttributes } from 'react'

const Select: FC<SelectHTMLAttributes<HTMLSelectElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <select
      className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </select>
  )
}

export default Select
