import { useParams } from 'react-router-dom'

import Pagination from 'components/Pagination'
import ProductList from 'components/ProductList'
import SortDropdown from 'components/SortDropdown'

import { usePageTitle, useProductListByCategory } from 'hooks/hooks'

export default function CategoryProducts() {
  const { categoryName = '' } = useParams<{ categoryName: string }>()
  usePageTitle(categoryName)
  const { data, isLoading, isError } = useProductListByCategory(categoryName)

  if (isLoading) return <>fetching category products data...</>
  if (isError || !data) return <>error fetching category products data</>

  return (
    <>
      <div>
        <div className="grow">
          <h1 className="text-2xl font-bold mb-6">Category: {categoryName}</h1>
          <SortDropdown />
          <ProductList list={data.products} />
        </div>
        <Pagination totalPages={data.total} />
      </div>
    </>
  )
}
