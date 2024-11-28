import { FC, ChangeEvent } from 'react'

import Label from 'components/shared-ui/Label'
import Select from 'components/shared-ui/Select'
import Option from 'components/shared-ui/Option'

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
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <Select id={id} value={selectedValue} onChange={handleChange}>
          {sortOptions.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
        <ArrowDownUp
          size={18}
          className="text-gray-400 rounded-md absolute top-2.5 right-2.5"
        />
      </div>
    </div>
  )
}

export default Dropdown
