// import { useParams } from 'react-router-dom'

function InventoryItem() {
  // const { itemId = '' } = useParams<{ itemId: string }>()
  // const { data, isFetching, isError } = useGetInventoryItem(itemId, {
  //   refetchOnMount: true,
  //   refetchOnWindowFocus: true,
  // })

  // if (isFetching) return <>fetching item details...</>
  // if (isError) return <>error fetching item details</>

  return (
    <>
      {/* <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
        {`${data.product?.name}`}
      </h2>
      <h3 className="text-gray-500 dark:text-gray-400">Description:</h3>
      <p className="text-gray-500 list-decimal list-inside dark:text-gray-400">{`${data.product?.description}`}</p> */}
    </>
  )
}

export default InventoryItem
