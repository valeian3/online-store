// import { useProductsCategoryList } from 'lib/hooks'

import Sidebar from 'components/sidebar/Sidebar'

// import SidebarItem from 'components/sidebar/SidebarItem'

function SidebarFilters() {
  //   const { data, isLoading, isError } = useProductsCategoryList({})

  //   if (isLoading) return <>fetching categories data...</>
  //   if (isError) return <>error fetching categories data</>

  return (
    <Sidebar>
      <h4 className="font-semibold">Filters</h4>
    </Sidebar>
  )
}

export default SidebarFilters
