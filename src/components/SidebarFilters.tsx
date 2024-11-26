import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { useCategoryListFilter, useSidebar } from 'lib/hooks'

import Input from 'components/Input'
import Search from 'components/Search'
import Sidebar from 'components/sidebar/Sidebar'
import SidebarItem from 'components/sidebar/SidebarItem'

import { ChartBarStacked, Filter, X } from 'lucide-react'

function SidebarFilters() {
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

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
    <Sidebar>
      <Search className="m-4 grow tablet:hidden" />
      <div className="py-3 px-4 bg-gray-200 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-primary-600 flex items-center justify-start">
          <Filter size={40} className="text-primary-500 rounded-md p-2" />
          FILTERS
        </h4>

        {hasFilters && (
          <button
            onClick={handleClearFilters}
            className="flex items-center bg-gray-300 text-gray-700 text-xs px-1 py-0.5 rounded-full hover:bg-gray-400"
          >
            Clear Filters
            <X size={14} className="text-gray-500 rounded-md" />
          </button>
        )}
      </div>

      <h4 className="font-semibold mx-4 my-2">Price</h4>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 px-4 mt-2 mb-4"
      >
        <Input
          id="price-from"
          name="priceFrom"
          placeholder="min"
          type="number"
          required
          value={priceFrom}
          onChange={handleChange}
        />
        <Input
          id="price-to"
          name="priceTo"
          placeholder="max"
          type="number"
          required
          value={priceTo}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="py-2 px-4 bg-primary-600 text-white rounded hover:bg-primary-400"
        >
          Apply
        </button>
      </form>

      {!params.categoryName && categories && (
        <>
          <h4 className="py-3 px-4 text-lg font-semibold text-primary-600 uppercase bg-gray-200 flex items-center justify-start">
            <ChartBarStacked
              size={40}
              className="text-primary-500 rounded-md p-2"
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
    </Sidebar>
  )
}

export default SidebarFilters
