import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  usePageTitle,
  useApiSearchParams,
  useProductListSearchWithFilters,
} from 'hooks/hooks'

import Modal from 'components/Modal'
import Pagination from 'components/Pagination'
import Filters from 'components/sidebar/Filters'
import ProductList from 'components/ProductList'
import SortDropdown from 'components/SortDropdown'
import Button from 'components/shared-ui/Button'

function SearchProducts() {
  const navigate = useNavigate()

  const { data, isLoading, isError } = useProductListSearchWithFilters()

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false)

  // TODO: improve setting title
  const parsedParams = useApiSearchParams()
  const memoizedSearchValue = useMemo(() => parsedParams.q, [parsedParams.q])
  usePageTitle(`Search result for: '${memoizedSearchValue}'`)

  // Guard against navigating to /search in url without param
  useEffect(() => {
    if (memoizedSearchValue === '') navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedSearchValue])

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
        <h1 className="mb-6 text-2xl font-bold">
          Search product: {memoizedSearchValue}
        </h1>
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

export default SearchProducts
