export interface IProduct {
  id: number
  title: string
  description: string
  category: string
  price: number
  thumbnail: string
}

export interface IProductList {
  products: IProduct[]
  limit: number
  skip: number
  total: number
}

export interface ICategoryListFilter {
  categoryName: string
  numOfProductsInCategory: number
}

export type ICategoryList = string[]
export type IProductListByCategory = IProductList
export type IProductListSearch = IProductList
export type IProductListSearchWithFilters = IProductList
