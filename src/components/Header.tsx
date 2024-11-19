import { useState, ChangeEvent, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState<string>('')

  const handleOpenLoginPage = () => {
    navigate(`login`)
  }

  const handleOpenRegisterPage = () => {
    navigate(`register`)
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSearch = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate(`search/?q=${searchValue}`)
  }

  return (
    <header className="h-24 z-10 shadow-md">
      <nav className="h-full bg-white border-gray-200 px-4 laptop:px-6 py-2.5 dark:bg-gray-800">
        <div className="h-full flex justify-between items-center">
          <a href="/" className="flex items-center">
            <p className="text-3xl font-semibold dark:text-white">
              King Online Shop
            </p>
          </a>

          <form className="w-1/4">
            <label
              htmlFor="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
                value={searchValue}
                onChange={(e) => handleChangeInput(e)}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => handleSearch(e)}
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex items-center laptop:order-2">
            <button
              className="hidden tablet:block text-gray-800 dark:text-white hover:text-primary-400 font-medium rounded-lg text-lg px-4 laptop:px-5 py-2 laptop:py-2.5 mr-2 dark:hover:bg-gray-700"
              onClick={handleOpenLoginPage}
            >
              Log in
            </button>
            <button
              className="hidden tablet:block text-white bg-primary-700 hover:bg-primary-400 font-medium rounded-lg text-lg px-4 laptop:px-5 py-2 laptop:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700  "
              onClick={handleOpenRegisterPage}
            >
              Register
            </button>

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg laptop:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {/* <div
            className="hidden justify-between items-center w-full laptop:flex laptop:w-auto laptop:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium laptop:flex-row laptop:space-x-8 laptop:mt-0">
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 laptop:bg-transparent laptop:text-primary-700 laptop:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 laptop:hover:bg-transparent laptop:border-0 laptop:hover:text-primary-700 laptop:p-0 dark:text-gray-400 laptop:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white laptop:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Company
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 laptop:hover:bg-transparent laptop:border-0 laptop:hover:text-primary-700 laptop:p-0 dark:text-gray-400 laptop:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white laptop:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Marketplace
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 laptop:hover:bg-transparent laptop:border-0 laptop:hover:text-primary-700 laptop:p-0 dark:text-gray-400 laptop:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white laptop:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 laptop:hover:bg-transparent laptop:border-0 laptop:hover:text-primary-700 laptop:p-0 dark:text-gray-400 laptop:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white laptop:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 laptop:hover:bg-transparent laptop:border-0 laptop:hover:text-primary-700 laptop:p-0 dark:text-gray-400 laptop:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white laptop:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </nav>
    </header>
  )
}

export default Header
