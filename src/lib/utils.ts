import type { IProductListByCategory } from 'lib/types'

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

/**
 * Filters a list of products based on optional category and price range filters.
 *
 * The function filters the `searchedProductsData` by matching the products'
 * category and price (min and max) with the values provided in the `filters` object.
 * If no filter is provided for a particular attribute (category, priceFrom, priceTo),
 * that filter is ignored. It returns a new object with the filtered products.
 *
 * @param {IProductListByCategory} searchedProductsData - The initial list of products to be filtered.
 * @param {Object} filters - The filters to apply.
 * @param {string} [filters.category] - The category to filter the products by (optional).
 * @param {string} [filters.priceFrom] - The minimum price to filter the products by (optional).
 * @param {string} [filters.priceTo] - The maximum price to filter the products by (optional).
 *
 * @returns {IProductListByCategory} The filtered products data.
 */
export function filterProducts(
  searchedProductsData: IProductListByCategory,
  filters: { category?: string; priceFrom?: string; priceTo?: string }
): IProductListByCategory {
  const { category, priceFrom, priceTo } = filters

  const filteredProducts = searchedProductsData.products.filter((product) => {
    if (category && product.category !== category) return false
    if (priceFrom !== undefined && product.price < Number(priceFrom))
      return false
    if (priceTo !== undefined && product.price > Number(priceTo)) return false

    return true
  })

  return { ...searchedProductsData, products: filteredProducts }
}
