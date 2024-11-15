import React from 'react'

interface IProduct {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
}

interface ProductCardProps {
  product: IProduct
  onClick: (id: number, title: string) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      onClick={() => onClick(product.id, product.title)}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover mb-4 rounded-lg"
      />
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      <p className="text-sm text-gray-600 mb-4">
        {product.description.length > 100
          ? `${product.description.substring(0, 100)}...`
          : product.description}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">${product.price}</span>
      </div>
    </div>
  )
}

export default ProductCard
