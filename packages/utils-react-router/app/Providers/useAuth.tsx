import React, { createContext, useContext, useState } from 'react'

type AuthData = {
  loggedIn: boolean
  setLoggedIn: (status: boolean) => void
}

const AuthContext = createContext<AuthData>({
  loggedIn: false,
  setLoggedIn: () => void 0,
})

export const AuthContextProvider = (props: React.PropsWithChildren<{}>) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useUserAuth = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext)
  return { loggedIn, setLoggedIn }
}

export const useUserAuthStatus = () => {
  const { loggedIn } = useContext(AuthContext)
  return loggedIn
}
