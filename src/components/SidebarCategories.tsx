import { useCategoryList } from 'lib/hooks'

import Search from 'components/Search'
import Sidebar from 'components/sidebar/Sidebar'
import SidebarItem from 'components/sidebar/SidebarItem'

import { ChartBarStacked } from 'lucide-react'

function SidebarCategories() {
  const { data, isLoading, isError } = useCategoryList()

  if (isLoading) return <>fetching categories data...</>
  if (isError || !data) return <>error fetching categories data</>

  return (
    <Sidebar>
      <Search className="m-4 grow tablet:hidden" />
      <h4 className="py-3 px-4 text-lg font-semibold text-primary-600 uppercase bg-gray-200 flex items-center justify-start">
        <ChartBarStacked
          size={40}
          className="text-primary-500 rounded-md p-2"
        />
        Categories
      </h4>
      <ul>
        {data.map((item, index) => (
          <SidebarItem key={index} label={item} />
        ))}
      </ul>
    </Sidebar>
  )
}

export default SidebarCategories
