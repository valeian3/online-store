import { useProductsCategoryList } from 'lib/hooks'

import SidebarItem from 'components/sidebar/SidebarItem'

function Sidebar() {
  const { data, isLoading, isError } = useProductsCategoryList({})

  if (isLoading) return <>fetching categories data...</>
  if (isError) return <>error fetching categories data</>

  return (
    <aside className="w-fit hidden tablet:block">
      <nav className="h-[calc(100vh-64px)] flex flex-col bg-white border-r shadow-sm">
        <ul className="flex-1 py-3 px-3 overflow-y-auto">
          <h4 className="font-semibold">Categories</h4>
          {data.map((item, index) => (
            <SidebarItem key={index} text={item} />
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
