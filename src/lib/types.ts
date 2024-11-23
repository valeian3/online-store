type Role = 'developer' | 'admin' | 'operator' | 'reader'
export interface IUser {
  id: number
  username: string
  email: string
  password: string
  roles?: Role[]
}

export type ILoginUser = Omit<IUser, 'id' | 'email' | 'roles'>
export type IRegisterUser = Omit<IUser, 'id' | 'email'>
export type IUserResponseMe = Omit<IUser, 'email' | 'password'>
export type IUserWithRoles = Omit<IUser, 'email' | 'password'>

export interface IItem {
  id: number
  name: string
  description: string
}
export interface IGetInventoryItem {
  product?: IItem
  message: string
  response_type: string
}
export interface IGetInventoryItems {
  products?: IItem[]
  message: string
  response_type: string
}

/** Online store types */
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
