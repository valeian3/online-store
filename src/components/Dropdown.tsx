import { FC, ChangeEvent } from 'react'

import { ArrowDownUp } from 'lucide-react'

interface DropdownProps {
  id?: string
  label?: string
  sortOptions: { value: string; label: string }[]
  selectedValue: string
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const Dropdown: FC<DropdownProps> = ({
  id = '',
  label,
  sortOptions,
  selectedValue,
  handleChange,
}) => {
  return (
    <div className="w-fit flex items-center gap-4">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="relative">
        <select
          id={id}
          value={selectedValue}
          onChange={handleChange}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
        >
          {sortOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <ArrowDownUp
          size={18}
          className="text-gray-400 rounded-md absolute top-2.5 right-2.5"
        />
      </div>
    </div>
  )
}

export default Dropdown
