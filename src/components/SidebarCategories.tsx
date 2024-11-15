import { useProductsCategoryList } from 'lib/hooks'

import Sidebar from 'components/sidebar/Sidebar'
import SidebarItem from 'components/sidebar/SidebarItem'

function SidebarCategories() {
  const { data, isLoading, isError } = useProductsCategoryList({})

  if (isLoading) return <>fetching categories data...</>
  if (isError) return <>error fetching categories data</>

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
          <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
        </svg>
        Categories
      </h4>
      {data.map((item, index) => (
        <SidebarItem key={index} text={item} />
      ))}
    </Sidebar>
  )
}

export default SidebarCategories
