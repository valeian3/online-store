import React, { useState } from 'react'
// import { useProductsCategoryList } from 'lib/hooks'

import Input from 'components/Input'
import Sidebar from 'components/sidebar/Sidebar'

// import SidebarItem from 'components/sidebar/SidebarItem'

function SidebarFilters() {
  //   const { data, isLoading, isError } = useProductsCategoryList({})

  //   if (isLoading) return <>fetching categories data...</>
  //   if (isError) return <>error fetching categories data</>

  const [priceFrom, setPriceFrom] = useState<string>('')
  const [priceTo, setPriceTo] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === 'priceFrom') {
      setPriceFrom(value)
    } else if (name === 'priceTo') {
      setPriceTo(value)
    }
  }

  return (
    <Sidebar>
      <h4 className="py-3 px-4 text-lg font-semibold text-primary-600 uppercase bg-gray-200 flex items-center justify-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 4h18M8 10h8M9 14h6L12 20l-3-6H9z" />
        </svg>
        Filters
      </h4>
      <div className="px-4 pt-2">
        <h4 className="font-semibold">Price</h4>
        <div className="flex gap-4 mt-2">
          <Input
            id="price-from"
            name="priceFrom"
            placeholder="min"
            value={priceFrom}
            onChange={handleChange}
          />
          <Input
            id="price-to"
            name="priceTo"
            placeholder="max"
            value={priceTo}
            onChange={handleChange}
          />
        </div>
      </div>
    </Sidebar>
  )
}

export default SidebarFilters
