import { useParams } from 'react-router-dom'

import SortDropdown from 'components/SortDropdown'
import ProductList from 'components/ProductList'
import SidebarFilters from 'components/SidebarFilters'
import SidebarLayout from 'layout/SidebarLayout'

import {
  usePageTitle,
  useParsedSearchParams,
  useProductsByCategory,
} from 'lib/hooks'

export default function CategoryProducts() {
  const { categoryName = '' } = useParams<{ categoryName: string }>()
  usePageTitle(categoryName)

  const parsedParams = useParsedSearchParams()

  const { data, isLoading, isError } = useProductsByCategory(
    categoryName,
    {},
    parsedParams
  )

  if (isLoading) return <>fetching category products data...</>
  if (isError) return <>error fetching category products data</>

  return (
    <SidebarLayout sidebar={<SidebarFilters />}>
      <h1 className="text-2xl font-bold mb-6">Category: {categoryName}</h1>
      <SortDropdown />
      <ProductList products={data.products} />
    </SidebarLayout>
  )
}
