import React from 'react'
import ProductCard from 'components/ProductCard'

import { useNavigate, useParams } from 'react-router-dom'

import { useProductsByCategory } from 'lib/hooks'
import { formatProductName } from 'lib/utils'

const ProductList: React.FC = () => {
  const navigate = useNavigate()
  const { categoryName = '' } = useParams<{ categoryName: string }>()
  const { data, isLoading, isError } = useProductsByCategory(categoryName, {})

  if (isLoading) return <>fetching products data...</>
  if (isError) return <>error fetching products data</>

  const handleCardClick = (productId: number, productName: string) => {
    const formattedName = formatProductName(productName, productId)
    navigate(`/${categoryName}/${formattedName}`)
  }

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={handleCardClick}
        />
      ))}
    </div>
  )
}

export default ProductList
