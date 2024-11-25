import { useParams } from 'react-router-dom'

import { extractProductId } from 'lib/utils'
import { usePageTitle, useProduct } from 'lib/hooks'

import Breadcrumbs from 'components/Breadcrumbs'

import { Heart } from 'lucide-react'

function Product() {
  const { productName = '' } = useParams<{ productName: string }>()
  const productId = extractProductId(productName)
  const { data, isLoading, isError } = useProduct(productId)
  usePageTitle(data?.title)

  if (isLoading) return <>fetching product data...</>
  if (isError || !data) return <>error fetching product data</>

  const { title, description, price, thumbnail } = data

  return (
    <div className="p-4 w-full grow">
      <Breadcrumbs />

      <h1 className="text-3xl font-semibold mb-4">{title}</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full h-full overflow-hidden bg-gray-100 rounded-sm">
          <img
            src={thumbnail}
            alt={title}
            className="max-w-full max-h-full object-contain mx-auto"
          />
        </div>
        <div className="md:w-2/3">
          <p className="text-lg text-gray-700">{description}</p>
          <p className="text-3xl font-semibold text-gray-900 mt-6 mb-12">
            ${price.toFixed(2)}
          </p>
          <div className="flex justify-start items-center gap-4">
            <button className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-700 transition duration-200">
              Add to Cart
            </button>
            <Heart
              size={40}
              className="text-gray-400 rounded-md p-2 hover:text-red-400 hover:bg-gray-100 tablet:block"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
