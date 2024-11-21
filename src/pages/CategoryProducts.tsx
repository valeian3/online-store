import { useParams } from 'react-router-dom'

import Pagination from 'components/Pagination'
import ProductList from 'components/ProductList'
import SortDropdown from 'components/SortDropdown'
import SidebarFilters from 'components/SidebarFilters'

import SidebarLayout from 'layout/SidebarLayout'

import { usePageTitle, useProductsByCategory } from 'lib/hooks'

export default function CategoryProducts() {
  const { categoryName = '' } = useParams<{ categoryName: string }>()
  usePageTitle(categoryName)
  const { data, isLoading, isError } = useProductsByCategory(categoryName, {})

  if (isLoading) return <>fetching category products data...</>
  if (isError) return <>error fetching category products data</>

  return (
    <SidebarLayout sidebar={<SidebarFilters />}>
      <div className="grow">
        <h1 className="text-2xl font-bold mb-6">Category: {categoryName}</h1>
        <SortDropdown />
        <ProductList products={data.products} />
      </div>
      <Pagination total={data.total} />
    </SidebarLayout>
  )
}
