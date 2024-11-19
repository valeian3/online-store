import { useParams, useSearchParams } from 'react-router-dom'

import Pagination from 'components/Pagination'
import ProductList from 'components/ProductList'
import SortDropdown from 'components/SortDropdown'
import SidebarFilters from 'components/SidebarFilters'

import SidebarLayout from 'layout/SidebarLayout'

import {
  usePageTitle,
  useParsedSearchParams,
  useProductsByCategory,
} from 'lib/hooks'

export default function CategoryProducts() {
  const { categoryName = '' } = useParams<{ categoryName: string }>()
  const [searchParams] = useSearchParams()

  usePageTitle(categoryName)
  const parsedParams = useParsedSearchParams()
  const currentPage = parseInt(searchParams.get('page') || '1')

  const { data, isLoading, isError } = useProductsByCategory(
    categoryName,
    {},
    parsedParams,
    currentPage
  )

  if (isLoading) return <>fetching category products data...</>
  if (isError) return <>error fetching category products data</>

  return (
    <SidebarLayout sidebar={<SidebarFilters />}>
      <h1 className="text-2xl font-bold mb-6">Category: {categoryName}</h1>
      <SortDropdown />
      <ProductList products={data.products} />
      <Pagination total={data.total} currentPage={currentPage} />
    </SidebarLayout>
  )
}
