import { useParams } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

import Selector from 'components/Selector'
import ProductList from 'components/ProductList'
import SidebarFilters from 'components/SidebarFilters'
import SidebarLayout from 'layout/SidebarLayout'

export default function Products() {
  const { categoryName = '' } = useParams<{ categoryName: string }>()

  // Hook for working with the query params
  const [searchParams, setSearchParams] = useSearchParams()

  // Get the current sort value from the query parameters (if any)
  const sortBy = searchParams.get('sortBy') || ''
  const order = searchParams.get('order') || 'asc'

  // Sort options for the selector
  const sortOptions = [
    { value: { sortBy: '', order: '' }, label: 'Sort by:' },
    { value: { sortBy: 'price', order: 'desc' }, label: 'high-low' },
    { value: { sortBy: 'price', order: 'asc' }, label: 'low-high' },
    { value: { sortBy: 'title', order: 'desc' }, label: 'Z to A' },
    { value: { sortBy: 'title', order: 'asc' }, label: 'A to Z' },
  ]

  // Handle when the user selects a new sorting option
  const handleSortChange = (newSortValue: {
    sortBy: string
    order: string
  }) => {
    const newSearchParams = new URLSearchParams()

    if (newSortValue.sortBy === '' && newSortValue.order === '') {
      newSearchParams.delete('sortBy')
      newSearchParams.delete('order')
    } else {
      newSearchParams.set('sortBy', newSortValue.sortBy)
      newSearchParams.set('order', newSortValue.order)
    }

    setSearchParams(newSearchParams)
  }

  return (
    <SidebarLayout sidebar={<SidebarFilters />}>
      <h1 className="text-2xl font-bold mb-6">Category: {categoryName}</h1>
      <Selector
        list={sortOptions}
        value={{ sortBy, order }}
        onChange={handleSortChange}
      />
      <ProductList />
    </SidebarLayout>
  )
}
