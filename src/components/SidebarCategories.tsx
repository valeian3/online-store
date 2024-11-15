import { useProductsCategoryList } from 'lib/hooks'

import Sidebar from 'components/sidebar/Sidebar'
import SidebarItem from 'components/sidebar/SidebarItem'

function SidebarCategories() {
  const { data, isLoading, isError } = useProductsCategoryList({})

  if (isLoading) return <>fetching categories data...</>
  if (isError) return <>error fetching categories data</>

  return (
    <Sidebar>
      <h4 className="font-semibold">Categories</h4>
      {data.map((item, index) => (
        <SidebarItem key={index} text={item} />
      ))}
    </Sidebar>
  )
}

export default SidebarCategories
