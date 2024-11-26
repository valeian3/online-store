import { FC } from 'react'

import { useFeatureFlags } from 'lib/hooks'

const Cart: FC = () => {
  const { cartFeature } = useFeatureFlags()

  return (
    <>
      <h2 className="text-2xl font-medium mb-6">Your Cart</h2>
      <div className="w-full flex justify-center">
        {cartFeature ? (
          <h3 className="text-xl font-medium">Your cart is empty</h3>
        ) : (
          <h3 className="text-xl font-medium">This feature is not available</h3>
        )}
      </div>
    </>
  )
}

export default Cart
