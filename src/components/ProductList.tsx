import { FC, useCallback } from 'react'

import { useLocalStorage } from 'lib/hooks'

import ProductCard from 'components/ProductCard'

import type { IProduct } from 'lib/types'

interface ProductListProps {
  list: IProduct[]
}

const ProductList: FC<ProductListProps> = ({ list }) => {
  const [wishlist, setWishlist] = useLocalStorage<IProduct[]>('wishlist', [])

  const handleAddToWishlist = useCallback(
    (product: IProduct) => {
      if (!wishlist.some((wishlistItem) => wishlistItem.id === product.id)) {
        setWishlist([...wishlist, product])
      } else {
        alert(`${product.title} already in the wishlist`)
      }
    },
    [setWishlist, wishlist]
  )

  return (
    <div className="mt-8 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-6">
      {list.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          handleAddToWishlist={handleAddToWishlist}
        />
      ))}
    </div>
  )
}

export default ProductList
