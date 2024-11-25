import { FC } from 'react'

import type { IProduct } from 'lib/types'

interface WishlistItemProps {
  product: IProduct
  handleRemoveProduct: (id: number) => void
}

const WishlistItem: FC<WishlistItemProps> = ({
  product,
  handleRemoveProduct,
}) => {
  const { title, price, thumbnail } = product
  return (
    <div className="flex items-center border-b border-gray-300 py-4">
      <img
        src={thumbnail}
        alt={title}
        className="w-16 h-16 object-contain mx-auto"
      />
      <div className="ml-4 flex-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-gray-500">{price}</p>
      </div>
      <button
        className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        onClick={() => handleRemoveProduct(product.id)}
      >
        Remove
      </button>
    </div>
  )
}

export default WishlistItem
