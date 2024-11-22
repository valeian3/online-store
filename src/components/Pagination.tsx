import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { numberOfItemsPerPage } from 'lib/constants'

const Pagination = ({ totalPages }: { totalPages?: number }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = parseInt(searchParams.get('page') || '1')

  const memoizedTotalPages = useMemo(() => {
    if (totalPages) return Math.ceil(totalPages / numberOfItemsPerPage)
    else return 0
  }, [totalPages])

  const updatePageInUrl = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', newPage.toString())
    setSearchParams(newSearchParams)
  }

  const handleNextPage = () => {
    if (currentPage < memoizedTotalPages) {
      updatePageInUrl(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      updatePageInUrl(currentPage - 1)
    }
  }

  const handleFirstPage = () => {
    updatePageInUrl(1)
  }

  const handleLastPage = () => {
    updatePageInUrl(memoizedTotalPages)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="inline-flex gap-1 mt-2">
        {currentPage !== 1 && (
          <>
            <button
              className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-primary-700 rounded-md hover:bg-primary-800 disabled:bg-gray-400`}
              onClick={handleFirstPage}
              title="Go to First Page"
            >
              <span className="sr-only">First page</span>
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5M12 5l-7 7 7 7"
                />
              </svg>
            </button>
            <button
              className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-primary-700 rounded-md hover:bg-primary-800 disabled:bg-gray-400`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              title="Go to Previous Page"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </>
        )}

        <span className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-700">
          Page {currentPage} of {memoizedTotalPages}
        </span>

        {currentPage !== memoizedTotalPages && (
          <>
            <button
              className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-primary-700 rounded-md hover:bg-primary-800 disabled:bg-gray-400`}
              onClick={handleNextPage}
              title="Go to Next Page"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
            <button
              className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-primary-700 rounded-md hover:bg-primary-800 disabled:bg-gray-400`}
              onClick={handleLastPage}
              title="Go to Last Page"
            >
              <span className="sr-only">Last page</span>
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Pagination
