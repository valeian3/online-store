import { useCallback, useMemo } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'

import { useSidebar } from 'hooks/hooks'

import Header from 'components/Header'
import Breadcrumbs from 'components/Breadcrumbs'
import SidebarCategories from 'components/SidebarCategories'
import SidebarFilters from 'components/SidebarFilters'

function MainLayout() {
  const { isSidebarOpen } = useSidebar()

  const { categoryName, productName } = useParams()
  const location = useLocation()

  const IS_HOME_PAGE = useMemo(
    () => location.pathname === '/',
    [location.pathname]
  )
  const IS_SEARCH_PAGE = useMemo(
    () => location.pathname.startsWith('/search'),
    [location.pathname]
  )
  const IS_CATEGORY_PAGE = useMemo(() => Boolean(categoryName), [categoryName])
  const IS_PRODUCT_PAGE = useMemo(() => Boolean(productName), [productName])

  const renderSidebar = useCallback(() => {
    if (IS_PRODUCT_PAGE) {
      return (
        <div className="tablet:hidden">
          <SidebarCategories />
        </div>
      )
    } else if (IS_SEARCH_PAGE || IS_CATEGORY_PAGE) {
      return <SidebarFilters />
    } else if (IS_HOME_PAGE) {
      return <SidebarCategories />
    } else {
      return (
        <div className="tablet:hidden">
          <SidebarCategories />
        </div>
      )
    }
  }, [IS_CATEGORY_PAGE, IS_HOME_PAGE, IS_PRODUCT_PAGE, IS_SEARCH_PAGE])

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex flex-row grow">
        {renderSidebar()}
        <section
          className={`max-h-[calc(100vh-96px)] w-full flex flex-col overflow-y-auto ${
            isSidebarOpen ? 'hidden' : 'block'
          } p-8  tablet:px-8 tablet:py-4 tablet:block tablet:w-full`}
        >
          <Breadcrumbs />
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default MainLayout
