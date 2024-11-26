import { FC, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { formatProductName } from 'lib/utils'

import type { IProduct } from 'lib/types'

import { Heart } from 'lucide-react'
import { useStorage } from 'lib/hooks'

interface ProductCardProps {
  product: IProduct
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate()
  const { categoryName = '' } = useParams<{ categoryName: string }>()

  const { wishlist, setWishlist } = useStorage()

  const handleCardClick = (productId: number, productName: string) => {
    const formattedName = formatProductName(productName, productId)
    if (categoryName === '') navigate(`/search/${formattedName}`)
    else navigate(`/${categoryName}/${formattedName}`)
  }

  const handleAddToWishlist = useCallback(
    (product: IProduct) => {
      if (!wishlist.some((wishlistItem) => wishlistItem.id === product.id)) {
        setWishlist([...wishlist, product])
      } else {
        alert(`${product.title} already in the wishlist`)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wishlist]
  )

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col">
      <div
        className="w-full h-48 overflow-hidden mb-4 rounded-tl-lg rounded-tr-lg transition-all duration-300 hover:bg-gray-200 hover:cursor-pointer"
        onClick={() => handleCardClick(product.id, product.title)}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-w-full max-h-full object-contain mx-auto"
        />
      </div>
      <div className="p-4 grow flex flex-col">
        <div className="grow">
          <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
          <p className="text-sm text-gray-600 mb-12">
            {product.description.length > 100
              ? `${product.description.substring(0, 100)}...`
              : product.description}
          </p>
        </div>

        <div className="w-full flex justify-between items-center">
          <Heart
            onClick={() => handleAddToWishlist(product)}
            size={40}
            className="text-gray-400 rounded-md p-2 hover:text-red-400 hover:bg-gray-100 tablet:block"
          />
          <p className="text-lg font-bold">${product.price}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
