import { useCallback, useState } from 'react'
import { useStorage } from 'hooks/hooks'

import type { IProduct } from 'types/types'

import { Heart } from 'lucide-react'

function AddToWishlist({ product }: { product: IProduct }) {
  const { wishlist, setWishlist } = useStorage()

  const [liked, setLiked] = useState<boolean>(
    wishlist.some((item) => item.id === product.id)
  )

  const handleAddToWishlist = useCallback(
    (product: IProduct) => {
      if (wishlist.some((wishlistItem) => wishlistItem.id === product.id)) {
        const updatedWishlist = wishlist.filter(
          (wishlistItem) => wishlistItem.id !== product.id
        )
        setWishlist(updatedWishlist)
        setLiked(false)
      } else {
        setWishlist([...wishlist, product])
        setLiked(true)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wishlist]
  )
  return (
    <Heart
      onClick={() => handleAddToWishlist(product)}
      size={28}
      className={`text-red-400 hover:cursor-pointer ${liked ? 'fill-red-400' : 'fill-none'}`}
    />
  )
}

export default AddToWishlist
