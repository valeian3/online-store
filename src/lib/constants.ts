import { IUserWithRoles } from './types'

export const devUser: IUserWithRoles = {
  id: 0,
  username: 'dev',
  roles: ['developer'],
}

export const urlParam = {
  redirectFrom: 'redirect-from',
}

// query keys
export const itemsKeys = {
  all: ['items'] as const,
  lists: () => [...itemsKeys.all, 'list'] as const,
  // list: (filters: string) => [...itemsKeys.lists(), { filters }] as const,
  details: () => [...itemsKeys.all, 'detail'] as const,
  detail: (id: number) => [...itemsKeys.details(), id] as const,
}

// query keys
export const userKeys = {
  user: ['user'] as const,
}
