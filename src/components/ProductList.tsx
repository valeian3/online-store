import { FC } from 'react'

import ProductCard from 'components/ProductCard'

import type { IProduct } from 'types/types'

interface ProductListProps {
  list: IProduct[]
}

const ProductList: FC<ProductListProps> = ({ list }) => {
  return (
    <div className="mt-8 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-6">
      {list.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
