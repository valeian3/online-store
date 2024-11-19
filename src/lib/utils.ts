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
  obj: { [s: string]: unknown } | ArrayLike<unknown>,
  keysToExclude: string | string[]
) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keysToExclude.includes(key))
  )
}
