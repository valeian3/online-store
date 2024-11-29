import { Outlet } from 'react-router-dom'

import Breadcrumbs from 'components/Breadcrumbs'
import Sidebar from 'components/sidebar/Sidebar'
import Filters from 'components/sidebar/Filters'
import Categories from 'components/sidebar/Categories'

function SidebarLayout({ sidebar }: { sidebar?: 'category' | 'filter' }) {
  const renderSidebar = () => {
    switch (sidebar) {
      case 'category':
        return <Categories />
      case 'filter':
        return <Filters />
      default:
        return null
    }
  }

  return (
    <>
      {sidebar && <Sidebar>{renderSidebar()}</Sidebar>}
      <section className="flex max-h-[calc(100vh-96px)] flex-grow flex-col overflow-y-auto p-8">
        <Breadcrumbs />
        <Outlet />
      </section>
    </>
  )
}

export default SidebarLayout
