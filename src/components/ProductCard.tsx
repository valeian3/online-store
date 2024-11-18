import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { formatProductName } from 'lib/utils'

import type { IProduct } from 'lib/types'

interface ProductCardProps {
  product: IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate()
  const { categoryName = '' } = useParams<{ categoryName: string }>()

  const handleCardClick = (productId: number, productName: string) => {
    const formattedName = formatProductName(productName, productId)
    if (categoryName === '') navigate(`/search/product/${formattedName}`)
    else navigate(`/${categoryName}/${formattedName}`)
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md relative"
      onClick={() => handleCardClick(product.id, product.title)}
    >
      <div className="w-full h-48 overflow-hidden mb-4 rounded-tl-lg rounded-tr-lg transition-all duration-300 hover:bg-gray-200 hover:cursor-pointer">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-sm text-gray-600 mb-8">
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </p>

        <div className="absolute bottom-4 right-4 text-lg font-bold">
          ${product.price}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
