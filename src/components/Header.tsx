import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  const handleOpenLoginPage = () => {
    navigate(`login`)
  }

  const handleOpenRegisterPage = () => {
    navigate(`register`)
  }
  return (
    <header className="h-16 z-10 shadow-md">
      <nav className="bg-white border-gray-200 px-4 laptop:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <p className="text-xl font-semibold dark:text-white">
              King Online Shop
            </p>
          </a>
          <div className="flex items-center laptop:order-2">
            <button
              className="hidden tablet:block text-gray-800 dark:text-white hover:bg-gray-50 font-medium rounded-lg text-sm px-4 laptop:px-5 py-2 laptop:py-2.5 mr-2 dark:hover:bg-gray-700"
              onClick={handleOpenLoginPage}
            >
              Log in
            </button>
            <button
              className="hidden tablet:block text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-4 laptop:px-5 py-2 laptop:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700  "
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
