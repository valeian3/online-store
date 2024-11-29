import { useParams } from 'react-router-dom'

import { extractProductId } from 'utils/utils'
import { useFeatureFlags, usePageTitle, useProduct } from 'hooks/hooks'

import AddToWishlist from 'components/AddToWishlist'

function Product() {
  const { productName = '' } = useParams<{ productName: string }>()

  const { cartFeature } = useFeatureFlags()
  const productId = extractProductId(productName)
  const { data, isLoading, isError } = useProduct(productId)
  usePageTitle(data?.title)

  if (isLoading) return <>fetching product data...</>
  if (isError || !data) return <>error fetching product data</>

  const { title, description, price, thumbnail } = data

  return (
    <div className="w-full grow">
      <h1 className="mb-4 text-3xl font-semibold">{title}</h1>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="h-full w-full overflow-hidden rounded-sm bg-gray-100">
          <img
            src={thumbnail}
            alt={title}
            className="mx-auto max-h-full max-w-full object-contain"
          />
        </div>
        <div className="md:w-2/3">
          <p className="text-lg text-gray-700">{description}</p>
          <p className="mb-12 mt-6 text-3xl font-semibold text-gray-900">
            ${price.toFixed(2)}
          </p>
          <div className="flex items-center justify-start gap-4">
            <button
              className="rounded-lg bg-primary-500 px-6 py-2 text-white transition duration-200 hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!cartFeature}
            >
              Add to Cart
            </button>
            <AddToWishlist product={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
