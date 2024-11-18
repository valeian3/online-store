import React from 'react'
import { useSearchParams } from 'react-router-dom'

// Sort options for the selector
const sortOptions = [
  { value: { sortBy: '', order: '' }, label: 'Sort by:' },
  { value: { sortBy: 'price', order: 'desc' }, label: 'high-low' },
  { value: { sortBy: 'price', order: 'asc' }, label: 'low-high' },
  { value: { sortBy: 'title', order: 'desc' }, label: 'Title Z to A' },
  { value: { sortBy: 'title', order: 'asc' }, label: 'Title A to Z' },
]

const Selector: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const order = searchParams.get('order') || undefined
  const sortBy = searchParams.get('sortBy') || undefined

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = sortOptions.find(
      (option) =>
        option.value.sortBy === event.target.value.split('|')[0] &&
        option.value.order === event.target.value.split('|')[1]
    )
    if (selectedOption) {
      const newSearchParams = new URLSearchParams(searchParams)

      if (
        selectedOption.value.sortBy === '' &&
        selectedOption.value.order === ''
      ) {
        newSearchParams.delete('sortBy')
        newSearchParams.delete('order')
      } else {
        newSearchParams.set('sortBy', selectedOption.value.sortBy)
        newSearchParams.set('order', selectedOption.value.order)
      }

      setSearchParams(newSearchParams)
    }
  }

  return (
    <div className="w-[200px]">
      <div className="relative">
        <select
          value={`${sortBy}|${order}`}
          onChange={handleChange}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
        >
          {sortOptions.map((item, index) => (
            <option
              key={index}
              value={`${item.value.sortBy}|${item.value.order}`}
            >
              {item.label}
            </option>
          ))}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.2"
          stroke="currentColor"
          className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>
    </div>
  )
}

export default Selector
