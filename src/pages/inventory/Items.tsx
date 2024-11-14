// import React from 'react'
// import { useGetInventoryItems } from 'lib/hooks'

// import type { IItem } from 'lib/types'
// import { useNavigate } from 'react-router-dom'

function Items() {
  // const navigate = useNavigate()
  // const { data, isFetching, isError } = useGetInventoryItems({
  //   refetchOnMount: true,
  //   refetchOnWindowFocus: true,
  //   refetchInterval: 1000 * 60,
  // })

  // const handleOpenItem: React.MouseEventHandler<HTMLLIElement> = (e) => {
  //   e.preventDefault()
  //   const itemId = e.currentTarget.getAttribute('data-item-id')
  //   navigate(`item/${itemId}`)
  // }

  // if (isFetching) return <>fetching items data...</>
  // if (isError) return <>error fetching items data</>

  return (
    <ol className="space-y-6 text-gray-500 list-decimal list-inside dark:text-gray-400">
      {/* {data.products?.map((item: IItem, index: number) => (
        <li
          key={index}
          data-item-id={item.id}
          onClick={(e) => handleOpenItem(e)}
          className="rounded-md p-3 transition-all hover:bg-slate-100"
        >
          <span className="font-semibold text-gray-900 dark:text-white">
            {`${item.name}`}
          </span>
        </li>
      ))} */}
    </ol>
  )
}

export default Items
