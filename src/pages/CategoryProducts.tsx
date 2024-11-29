import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Modal from 'components/Modal'
import Pagination from 'components/Pagination'
import Filters from 'components/sidebar/Filters'
import ProductList from 'components/ProductList'
import SortDropdown from 'components/SortDropdown'
import Button from 'components/shared-ui/Button'

import { usePageTitle, useProductListByCategory } from 'hooks/hooks'

export default function CategoryProducts() {
  const { categoryName = '' } = useParams<{ categoryName: string }>()
  usePageTitle(categoryName)
  const { data, isLoading, isError } = useProductListByCategory(categoryName)

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false)

  if (isLoading) return <>fetching category products data...</>
  if (isError || !data) return <>error fetching category products data</>

  const handleOpenMobileSidebar = () => {
    setIsMobileSidebarOpen(true)
  }

  const handleCloseMobileSidebar = () => {
    setIsMobileSidebarOpen(false)
  }

  return (
    <>
      <div className="grow">
        <h1 className="mb-6 text-2xl font-bold">Category: {categoryName}</h1>
        <div className="flex items-center justify-center gap-4 tablet:justify-start">
          <SortDropdown />
          <Button onClick={handleOpenMobileSidebar} className="tablet:hidden">
            Filters
          </Button>
        </div>
        <ProductList list={data.products} />
      </div>
      <Pagination totalPages={data.total} />

      <Modal
        position="right"
        open={isMobileSidebarOpen}
        onClose={handleCloseMobileSidebar}
      >
        <Filters />
      </Modal>
    </>
  )
}
