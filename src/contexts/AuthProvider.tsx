import {
  createContext,
  ReactNode,
  FC,
  useState,
  useMemo,
  useEffect,
} from 'react'
import { AxiosResponse } from 'axios'

import { userAuthProvider } from 'lib/api'
import { devUser } from 'lib/constants'

import { ILoginUser, IRegisterUser, IUserWithRoles } from 'lib/types'

interface AuthContextProps {
  isDev: boolean
  user: IUserWithRoles | null
  signin: (credentials: ILoginUser) => Promise<void>
  signout: () => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (credentials: IRegisterUser) => Promise<AxiosResponse<any, any>>
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
)

// TODO: refactor getUser via useQuery
export const AuthProvider: FC<{
  children: ReactNode
  isDev: boolean
}> = ({ children, isDev }) => {
  const [user, setUser] = useState<IUserWithRoles | null>(null)
  // console.log('user', user)

  useEffect(() => {
    if (isDev) setUser(devUser)
  }, [isDev])

  async function signin(credentials: ILoginUser) {
    return userAuthProvider.signin(credentials).then(() => {
      userAuthProvider.getUser().then((res) => {
        const tempUser: IUserWithRoles = {
          ...res.data,
          roles: ['Patient'],
        }
        setUser(tempUser)
      })
    })
  }

  async function signout() {
    return userAuthProvider.signout().then(() => {
      setUser(null)
    })
  }

  async function register(credentials: IRegisterUser) {
    return userAuthProvider.register(credentials)
  }

  const contextValue = useMemo<AuthContextProps>(
    () => ({
      isDev,
      user,

      signin,
      signout,
      register,
    }),
    [isDev, user]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
