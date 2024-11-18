import { useParams } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

import Selector from 'components/Selector'
import ProductList from 'components/ProductList'
import SidebarFilters from 'components/SidebarFilters'
import SidebarLayout from 'layout/SidebarLayout'

import { useProductsByCategory } from 'lib/hooks'

export default function Products() {
  const { categoryName = '' } = useParams<{ categoryName: string }>()
  const [searchParams] = useSearchParams()

  const order = searchParams.get('order') || ''
  const sortBy = searchParams.get('sortBy') || ''

  const { data, isLoading, isError } = useProductsByCategory(
    categoryName,
    {},
    { sortBy, order }
  )

  if (isLoading) return <>fetching category products data...</>
  if (isError) return <>error fetching category products data</>

  return (
    <SidebarLayout sidebar={<SidebarFilters />}>
      <h1 className="text-2xl font-bold mb-6">Category: {categoryName}</h1>
      <Selector />
      <ProductList products={data.products} />
    </SidebarLayout>
  )
}
