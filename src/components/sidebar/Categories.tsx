import { FC } from 'react'

import { useCategoryList } from 'hooks/hooks'

import Search from 'components/Search'
import SidebarItem from 'components/sidebar/SidebarItem'

import { ChartBarStacked } from 'lucide-react'

const Categories: FC = () => {
  const { data, isLoading, isError } = useCategoryList()

  if (isLoading) return <>fetching categories data...</>
  if (isError || !data) return <>error fetching categories data</>

  return (
    <div className="flex flex-col">
      <Search className="m-4 grow tablet:hidden" />
      <h4 className="flex items-center justify-start bg-gray-200 px-4 py-3 text-lg font-semibold uppercase text-primary-600">
        <ChartBarStacked
          size={40}
          className="rounded-md p-2 text-primary-500"
        />
        Categories
      </h4>
      <ul>
        {data.map((item, index) => (
          <SidebarItem key={index} label={item} />
        ))}
      </ul>
    </div>
  )
}

export default Categories
