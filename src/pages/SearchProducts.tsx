import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

import { useSearchProducts } from 'lib/hooks'

import SidebarLayout from 'layout/SidebarLayout'

import Selector from 'components/Selector'
import ProductList from 'components/ProductList'
import SidebarFilters from 'components/SidebarFilters'

function SearchProducts() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const searchValue = searchParams.get('q') || ''
  const order = searchParams.get('order') || undefined
  const sortBy = searchParams.get('sortBy') || undefined

  const { data, isLoading, isError } = useSearchProducts(
    searchValue,
    {},
    { sortBy, order }
  )

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
      <Selector />
      <ProductList products={data.products} />
    </SidebarLayout>
  )
}

export default SearchProducts
