import React, { createContext, useState } from 'react'

type AuthData = {
  loggedIn: boolean
  setLoggedIn: (status: boolean) => void
}

export const AuthContext = createContext<AuthData>({
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
