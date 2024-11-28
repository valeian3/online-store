import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { numberOfItemsPerPage } from 'constants/constants'

import {
  ArrowRightToLine,
  ArrowRight,
  ArrowLeft,
  ArrowLeftToLine,
} from 'lucide-react'

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = parseInt(searchParams.get('page') || '1')

  const memoizedTotalPages = useMemo(
    () => Math.ceil(totalPages / numberOfItemsPerPage),

    [totalPages]
  )

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
              <ArrowLeftToLine size={34} className="rounded-md p-2" />
            </button>
            <button
              className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-primary-700 rounded-md hover:bg-primary-800 disabled:bg-gray-400`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              title="Go to Previous Page"
            >
              <ArrowLeft size={34} className="rounded-md p-2" />
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
              <ArrowRight size={34} className="rounded-md p-2" />
            </button>
            <button
              className={`flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-primary-700 rounded-md hover:bg-primary-800 disabled:bg-gray-400`}
              onClick={handleLastPage}
              title="Go to Last Page"
            >
              <ArrowRightToLine size={34} className="rounded-md p-2" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Pagination
