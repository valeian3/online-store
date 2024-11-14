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

// Types for an online store app

// product
export interface IProduct {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
}

// categories
export type IProductsCategoryList = string[]
export interface IProductsByCategory {
  limit: number
  products: IProduct[]
  skip: number
  total: number
}
