import React, { FC, useCallback } from 'react'

import { useLocalStorage } from 'lib/hooks'

import WishlistItem from 'components/WishlistItem'

import type { IProduct } from 'lib/types'

const Wishlist: FC = () => {
  const [wishlist, setWishlist] = useLocalStorage<IProduct[]>('wishlist', [])

  const handleRemoveProduct = useCallback(
    (id: number) => {
      setWishlist(wishlist.filter((product) => product.id !== id))
    },
    [setWishlist, wishlist]
  )

  return (
    <div className="p-8">
      <h2 className="text-2xl font-medium mb-6">Your Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="w-full flex justify-center">
          <h3 className="text-xl font-medium">Your wishlist is empty</h3>
        </div>
      ) : (
        <ul>
          {wishlist.map((product) => (
            <React.Fragment key={product.id}>
              <WishlistItem
                product={product}
                handleRemoveProduct={handleRemoveProduct}
              />
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Wishlist
