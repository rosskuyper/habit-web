import React, {useContext, useState} from 'react'
import {useQuery, gql} from '@apollo/client'

export type User = {
  sub: string
}

export type AuthContextType = {
  /**
   * null = user not logged in
   * undefined = user state not known
   */
  user: User | null | undefined
  setUser: (newUser: User) => void
  logout: () => void
}

/**
 * React needs a default context value, though this should never be used.
 * We cannot use the value given by useProvideAuth() because that includes hooks
 * which need to be called from within a mounted react node.
 *
 * We export a provider with a built-in value further down.
 * Trying to use useAuth without that provider will result in the below errors being thrown.
 */
const AuthContext = React.createContext<AuthContextType>({
  user: undefined,
  setUser: (_newUser: User) => {
    throw new Error('Cannot use default AuthContext. Ensure that a provider is defined.')
  },
  logout: () => {
    throw new Error('Cannot use default AuthContext')
  },
})

/**
 * This is the initial server ping we run to see if we're logged in
 * Because we don't have any access to the cookie this is the safest bet
 */
const ME_QUERY = gql`
  query {
    me {
      user {
        sub
        email
        first
        last
        updatedAt
        createdAt
      }
    }
  }
`

const useProvideAuth = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useQuery(ME_QUERY, {
    onCompleted: (data) => {
      // This will set the user to null if not logged in
      setUser(data?.me.user?.sub || null)
    },
  })

  const logout = () => {
    setUser(null)
  }

  return {
    user,
    setUser: (newUser: User) => {
      setUser(newUser)
    },
    logout,
  }
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export const ProvideAuth = ({children}: {children: JSX.Element}): JSX.Element => {
  const auth = useProvideAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
