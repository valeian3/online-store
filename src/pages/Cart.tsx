import { FC } from 'react'

import { useFeatureFlags } from 'lib/hooks'

const Cart: FC = () => {
  const { cartFeature } = useFeatureFlags()

  console.log(cartFeature)
  return (
    <div className="p-8">
      <h2 className="text-2xl font-medium mb-6">Your Cart</h2>
      <div className="w-full flex justify-center">
        {cartFeature ? (
          <h3 className="text-xl font-medium">Your cart is empty</h3>
        ) : (
          <h3 className="text-xl font-medium">This feature is not available</h3>
        )}
      </div>
    </div>
  )
}

export default Cart
