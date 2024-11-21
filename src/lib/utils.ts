import type { IProductsByCategory } from 'lib/types'

// TODO: instead of 0 return null, test out query with null
// Function to extract product ID from formatted name
export const extractProductId = (formattedProductName: string): number => {
  const productId = formattedProductName.split('-').pop()
  return productId ? parseInt(productId) : 0
}

// Function to format product name with ID appended at the end
export const formatProductName = (productName: string, productId: number) => {
  return `${productName.toLowerCase().replace(/\s+/g, '-')}-${productId}`
}

export function excludeKeys(
  obj: Record<string, string>,
  keysToExclude: string | string[]
): Record<string, string> {
  const keysArray = Array.isArray(keysToExclude)
    ? keysToExclude
    : [keysToExclude]

  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysArray.includes(key))
  )
}

// filter searched products by min-max price and category
export function filterProducts(
  searchedProductsData: IProductsByCategory,
  filters: { category?: string; minPrice?: number; maxPrice?: number }
): IProductsByCategory {
  const { category, minPrice, maxPrice } = filters

  const filteredProducts = searchedProductsData.products.filter((product) => {
    const matchesCategory = category ? product.category === category : true
    const matchesMinPrice =
      minPrice !== undefined ? product.price >= minPrice : true
    const matchesMaxPrice =
      maxPrice !== undefined ? product.price <= maxPrice : true

    return matchesCategory && matchesMinPrice && matchesMaxPrice
  })

  return { ...searchedProductsData, products: filteredProducts }
}
