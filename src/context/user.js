import { createContext, useReducer } from 'react'

export const userContext = createContext()

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        user: action.payload,
      }
    case 'DELETE_USER':
      return {
        user: null,
      }
    default:
      return state
  }
}

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, {
    user: null,
  })

  return (
    <userContext.Provider value={{ ...state, dispatch }}>
      {children}
    </userContext.Provider>
  )
}
