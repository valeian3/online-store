import React, { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { useCategoryListFilter, useSidebar } from 'hooks/hooks'

import Input from 'components/shared-ui/Input'
import SidebarItem from 'components/sidebar/SidebarItem'

import { ChartBarStacked, Filter, X } from 'lucide-react'

function Filters() {
  const { categoryName } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const IS_CATEGORY_PAGE = useMemo(() => Boolean(categoryName), [categoryName])

  const { toggleSidebar } = useSidebar()
  const categories = useCategoryListFilter()

  const [priceFrom, setPriceFrom] = useState<string>(
    searchParams.get('priceFrom') || ''
  )
  const [priceTo, setPriceTo] = useState<string>(
    searchParams.get('priceTo') || ''
  )

  const handleSetUrlParam = (categoryName: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('category', categoryName)

    setSearchParams(newSearchParams)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === 'priceFrom') {
      setPriceFrom(value)
    } else if (name === 'priceTo') {
      setPriceTo(value)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('priceFrom', priceFrom)
    newSearchParams.set('priceTo', priceTo)

    setSearchParams(newSearchParams)
    toggleSidebar(false)
  }

  const handleClearFilters = () => {
    const newSearchParams = new URLSearchParams()

    if (searchParams.has('q')) {
      newSearchParams.set('q', searchParams.get('q') as string)
    }

    setPriceFrom('')
    setPriceTo('')
    setSearchParams(newSearchParams)
    toggleSidebar(false)
  }

  const hasFilters =
    searchParams.has('priceFrom') ||
    searchParams.has('priceTo') ||
    searchParams.has('category')

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between bg-gray-200 px-4 py-3">
        <h4 className="flex items-center justify-start text-lg font-semibold text-primary-600">
          <Filter size={40} className="rounded-md p-2 text-primary-500" />
          FILTERS
        </h4>

        {hasFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center rounded-full bg-gray-300 px-1 py-0.5 text-xs text-gray-700 hover:bg-gray-400"
          >
            Clear Filters
            <X size={14} className="rounded-md text-gray-500" />
          </button>
        )}
      </div>

      <h4 className="mx-4 my-2 font-semibold">Price</h4>
      <form
        onSubmit={handleSubmit}
        className="mb-4 mt-2 flex flex-col gap-4 px-4"
      >
        <Input
          id="price-from"
          name="priceFrom"
          type="number"
          placeholder="min"
          min="0"
          required
          value={priceFrom}
          onChange={handleChange}
        />
        <Input
          id="price-to"
          name="priceTo"
          type="number"
          placeholder="max"
          min="0"
          required
          value={priceTo}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="rounded bg-primary-600 px-4 py-2 text-white hover:bg-primary-400"
        >
          Apply
        </button>
      </form>

      {!IS_CATEGORY_PAGE && categories && (
        <>
          <h4 className="flex items-center justify-start bg-gray-200 px-4 py-3 text-lg font-semibold uppercase text-primary-600">
            <ChartBarStacked
              size={40}
              className="rounded-md p-2 text-primary-500"
            />
            Categories
          </h4>
          <ul>
            {categories.map((item, index) => (
              <SidebarItem
                key={index}
                label={item.categoryName}
                numOfItems={item.numOfProductsInCategory}
                handleClick={handleSetUrlParam}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Filters
