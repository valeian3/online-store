import React, { FC, useCallback } from 'react'

import { useStorage } from 'hooks/hooks'

import WishlistItem from 'components/WishlistItem'

const Wishlist: FC = () => {
  const { wishlist, setWishlist } = useStorage()

  const handleRemoveProduct = useCallback(
    (id: number) => {
      setWishlist(wishlist.filter((product) => product.id !== id))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wishlist]
  )

  return (
    <>
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
    </>
  )
}

export default Wishlist
