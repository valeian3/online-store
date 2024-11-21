import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  useCategoryList,
  usePageTitle,
  useParsedSearchParams,
  useSearchProducts,
} from 'lib/hooks'

import SidebarLayout from 'layout/SidebarLayout'

import Pagination from 'components/Pagination'
import ProductList from 'components/ProductList'
import SortDropdown from 'components/SortDropdown'
import SidebarFilters from 'components/SidebarFilters'

function SearchProducts() {
  const navigate = useNavigate()
  const parsedParams = useParsedSearchParams()
  const memoizedSearchValue = useMemo(() => parsedParams.q, [parsedParams.q])
  usePageTitle(`Search result for: '${memoizedSearchValue}'`)
  const { data, isLoading, isError } = useSearchProducts({})
  const categories = useCategoryList()

  // guard against someone navigating to /search in url without param
  useEffect(() => {
    if (memoizedSearchValue === '') navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedSearchValue])

  if (isLoading) return <>fetching category products data...</>
  if (isError) return <>error fetching category products data</>

  return (
    <SidebarLayout sidebar={<SidebarFilters categories={categories} />}>
      <h1 className="text-2xl font-bold mb-6">
        Search product: {memoizedSearchValue}
      </h1>
      <SortDropdown />
      <ProductList products={data.products} />
      <Pagination total={data.total} />
    </SidebarLayout>
  )
}

export default SearchProducts
