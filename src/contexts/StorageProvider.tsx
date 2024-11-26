import { createContext, ReactNode, useMemo } from 'react'

import { useLocalStorage } from 'lib/hooks'

import type { IProduct } from 'lib/types'

interface StorageContextProps {
  wishlist: IProduct[]
  setWishlist: (wishlist: IProduct[]) => void
  cart: IProduct[]
  setCart: (cart: IProduct[]) => void
}

export const StorageContext = createContext<StorageContextProps | undefined>(
  undefined
)

export const StorageProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useLocalStorage<IProduct[]>('wishlist', [])
  const [cart, setCart] = useLocalStorage<IProduct[]>('cart', [])

  const contextValue = useMemo<StorageContextProps>(
    () => ({
      wishlist,
      setWishlist,
      cart,
      setCart,
    }),
    [cart, setCart, setWishlist, wishlist]
  )

  return (
    <StorageContext.Provider value={contextValue}>
      {children}
    </StorageContext.Provider>
  )
}
