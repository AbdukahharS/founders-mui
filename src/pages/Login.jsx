import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Snackbar, Alert, Stack } from '@mui/material'
import { getDoc, doc, setDoc } from 'firebase/firestore'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth, provider, db } from '../config/firebase'
import { useUserContext } from '../hooks/useUserContext'

const Login = () => {
  const { dispatch, user } = useUserContext()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result)
        const docRef = doc(db, 'profiles', result.user.uid)
        dispatch({ type: 'SET_USER', payload: result.user })
        getDoc(docRef).then((snap) => {
          if (!snap.exists()) {
            const newProfile = {
              admin: false,
              displayName: result.user.displayName,
              email: result.user.email,
            }
            setDoc(doc(db, 'profiles', result.user.uid), newProfile)
              .then(() => {
                setError(
                  'You have registered successfully. But you have no access for admin panel. Wait for admin to give it!'
                )
              })
              .catch((err) => {
                console.error(err)
                setError(err.message)
              })
          }
        })
      })
      .catch((error) => {
        GoogleAuthProvider.credentialFromError(error)
        console.error(error)
        setError(error.message)
      })
  }
  useEffect(() => {
    const pathname = window.location.pathname
    const checkValid = () => {
      const docRef = doc(db, 'profiles', user.uid)
      getDoc(docRef).then((snap) => {
        if (snap.exists()) {
          const data = snap.data()
          if (data.admin === true) {
            navigate(`/admin/${localStorage.getItem('adminpath')}`)
          } else {
            navigate('/login')
            setError('You have no permission to admin panel!')
          }
        } else {
          dispatch({ type: 'DELETE_USER' })
        }
      })
    }
    if (pathname === '/login' && user) {
      checkValid()
    }
  }, [user, navigate, dispatch])

  return (
    <>
      <Stack
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        direction='column'
        spacing={2}
      >
        <button onClick={signIn}>Sign in with Google</button>
      </Stack>
      <Snackbar
        open={error ? true : false}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert
          onClose={() => setError(null)}
          severity='error'
          sx={{
            width: '100%',
            fontSize: '1.4rem',
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  )
}
export default Login
