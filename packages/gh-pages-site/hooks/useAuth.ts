import { AuthContext } from '@context/AuthContext'
import { useContext } from 'react'

export const useUserAuth = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext)
  return { loggedIn, setLoggedIn }
}

export const useUserAuthStatus = () => {
  const { loggedIn } = useContext(AuthContext)
  return loggedIn
}
