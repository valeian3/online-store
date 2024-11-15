import { useParams } from 'react-router-dom'

import Selector from 'components/Selector'
import ProductList from 'components/ProductList'
import SidebarFilters from 'components/SidebarFilters'
import Breadcrumbs from 'components/BreadCrumbs'

function Products() {
  const { categoryName = '' } = useParams<{ categoryName: string }>()
  const sortOptions = [
    { value: '', label: 'Sort by:' },
    { value: 'price-desc', label: 'high-low' },
    { value: 'price-asc', label: 'low-high' },
    { value: 'title-asc', label: 'A to Z' },
    { value: 'title-desc', label: 'Z to A' },
  ]

  return (
    <div className="h-full flex flex-row">
      <SidebarFilters />
      <section className="grow tablet:px-8 tablet:py-4 overflow-y-auto max-h-[calc(100vh-96px)]">
        <Breadcrumbs />
        <h1 className="text-2xl font-bold mb-6">Category: {categoryName}</h1>
        <Selector list={sortOptions} />
        <ProductList />
      </section>
    </div>
  )
}

export default Products
