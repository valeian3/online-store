import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  usePageTitle,
  useApiSearchParams,
  useProductListSearchWithFilters,
} from 'lib/hooks'

import Pagination from 'components/Pagination'
import ProductList from 'components/ProductList'
import SortDropdown from 'components/SortDropdown'

function SearchProducts() {
  const navigate = useNavigate()

  const { data, isLoading, isError } = useProductListSearchWithFilters()

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

  return (
    <>
      <div className="grow">
        <h1 className="text-2xl font-bold mb-6">
          Search product: {memoizedSearchValue}
        </h1>
        <SortDropdown />
        <ProductList list={data.products} />
      </div>

      <Pagination totalPages={data.total} />
    </>
  )
}

export default SearchProducts
