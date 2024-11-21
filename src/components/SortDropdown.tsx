import React from 'react'

import { useSortParams } from 'lib/hooks'
import { sortOptions } from 'lib/constants'

import Dropdown from 'components/Dropdown'

const SortDropdown: React.FC = () => {
  const { memoizedSearchValue, handleSortChange } = useSortParams()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = event.target.value.split('|')
    handleSortChange(sortBy, order)
  }

  return (
    <Dropdown
      id="sort-by"
      label="Sort by:"
      sortOptions={sortOptions}
      selectedValue={memoizedSearchValue}
      handleChange={handleChange}
    />
  )
}

export default SortDropdown
