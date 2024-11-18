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

// remove empty or whitespace-only values from an object
export const removeEmptyValues = <T extends object>(obj: T): T =>
  Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(obj).filter(([_, value]) => {
      // Remove entries where the value is falsy or an empty string after trimming
      return typeof value === 'string' ? value.trim() !== '' : value
    })
  ) as T
