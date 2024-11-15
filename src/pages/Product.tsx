import { useParams } from 'react-router-dom'

import { useProduct } from 'lib/hooks'
import { extractProductId } from 'lib/utils'
import Breadcrumbs from 'components/BreadCrumbs'

function Product() {
  const { productName = '' } = useParams<{ productName: string }>()
  const productId = extractProductId(productName)
  const { data, isLoading, isError } = useProduct(productId, {})

  if (isLoading) return <>fetching product data...</>
  if (isError) return <>error fetching product data</>

  const { title, description, price, thumbnail } = data
  return (
    <div className="container p-4">
      <Breadcrumbs />
      <h1 className="text-3xl font-semibold mb-4">{title}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3">
          <p className="text-lg text-gray-700 mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
