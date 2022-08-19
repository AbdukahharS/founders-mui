import { useContext } from 'react'
import { userContext } from '../context/user'

export const useUserContext = () => {
  const context = useContext(userContext)

  if (!context) {
    throw Error('useUserContext must be used inside an UserContextProvider')
  }

  return context
}
