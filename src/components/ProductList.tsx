import React from 'react'
import ProductCard from 'components/ProductCard'

import type { IProduct } from 'lib/types'

interface ProductListProps {
  list: IProduct[]
}

const ProductList: React.FC<ProductListProps> = ({ list }) => {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {list.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
