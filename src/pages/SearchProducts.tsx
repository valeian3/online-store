import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  usePageTitle,
  useParsedSearchParams,
  useSearchProducts,
} from 'lib/hooks'

import SidebarLayout from 'layout/SidebarLayout'

import SortDropdown from 'components/SortDropdown'
import ProductList from 'components/ProductList'
import SidebarFilters from 'components/SidebarFilters'

function SearchProducts() {
  const navigate = useNavigate()

  const parsedParams = useParsedSearchParams()
  const searchValue = useMemo(() => parsedParams.q, [parsedParams.q])

  usePageTitle(`Search result for: '${searchValue}'`)

  const { data, isLoading, isError } = useSearchProducts({}, parsedParams)

  // guard against someone navigating to /search in url without param
  useEffect(() => {
    if (searchValue === '') navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  if (isLoading) return <>fetching category products data...</>
  if (isError) return <>error fetching category products data</>

  return (
    <SidebarLayout sidebar={<SidebarFilters />}>
      <h1 className="text-2xl font-bold mb-6">Search product: {searchValue}</h1>
      <SortDropdown />
      <ProductList products={data.products} />
    </SidebarLayout>
  )
}

export default SearchProducts
