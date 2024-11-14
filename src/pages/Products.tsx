import { useNavigate, useParams } from 'react-router-dom'

import { useProductsByCategory } from 'lib/hooks'

import type { IProduct } from 'lib/types'

function Products() {
  const { categoryName = '' } = useParams<{ categoryName: string }>()
  const { data, isLoading, isError } = useProductsByCategory(categoryName, {})
  const navigate = useNavigate()

  if (isLoading) return <>fetching categories data...</>
  if (isError) return <>error fetching categories data</>

  // TODO: export formatting name into separate function
  const handleCardClick = (productId: number, productName: string) => {
    const formattedName = productName.toLowerCase().replace(/\s+/g, '-')
    navigate(`/${categoryName}/${formattedName}/${productId}`)
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Category: {categoryName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((product: IProduct, index: number) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            onClick={() => handleCardClick(product.id, product.title)}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-sm text-gray-600 mb-4">
              {product.description.length > 100
                ? `${product.description.substring(0, 100)}...`
                : product.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">${product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Products
