// import { useProductsCategoryList } from 'lib/hooks'

import Sidebar from 'components/sidebar/Sidebar'

// import SidebarItem from 'components/sidebar/SidebarItem'

function SidebarFilters() {
  //   const { data, isLoading, isError } = useProductsCategoryList({})

  //   if (isLoading) return <>fetching categories data...</>
  //   if (isError) return <>error fetching categories data</>

  return (
    <Sidebar>
      <h4 className="py-3 px-4 text-lg font-semibold text-primary-600 uppercase bg-gray-200 flex items-center justify-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 4h18M8 10h8M9 14h6L12 20l-3-6H9z" />
        </svg>
        Filters
      </h4>
    </Sidebar>
  )
}

export default SidebarFilters
