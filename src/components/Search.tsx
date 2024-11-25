import { useState, ChangeEvent, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSidebar } from 'lib/hooks'

import { Search as SearchIcon } from 'lucide-react'

function Search({ className = '' }: { className: string }) {
  const navigate = useNavigate()
  const { toggleSidebar } = useSidebar()
  const [searchValue, setSearchValue] = useState<string>('')

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleSidebar(false)
    navigate(`/search/?q=${searchValue}`, { replace: true })
  }

  return (
    <form className={className}>
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchIcon size={34} className="text-gray-500 rounded-md p-2" />
        </div>
        <input
          type="search"
          id="search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search"
          required
          value={searchValue}
          onChange={(e) => handleChangeInput(e)}
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          onClick={(e) => handleSearch(e)}
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default Search
