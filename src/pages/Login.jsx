import React, { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { Snackbar, Alert } from '@mui/material'

const Login = ({ setToken }) => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  useEffect(() => {
    const pathname = window.location.pathname
    const checkValid = () => {
      fetch('https://founders-backend.shakhzodbekkakh.repl.co/api/welcome', {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Access-Control-Allow-Origin': 'no-cors',
        },
      })
        .then(async (res) => {
          const data = await res.json()
          if (data.message !== 'valid') {
            setToken(null)
            navigate('/login')
          } else {
            navigate(`/admin/${localStorage.getItem('adminpath')}`)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
    if (pathname === '/login') {
      checkValid()
    }
  }, [navigate, setToken])

  const responseGoogle = async (gRes) => {
    const email = gRes.profileObj.email
    const id = gRes.googleId
    //Validate inputs
    if (!(email && id)) {
      return alert('All inputs must be filled!')
    }

    const user = JSON.stringify({ email, id })

    const res = await fetch(
      'https://founders-backend.shakhzodbekkakh.repl.co/api/login',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: user,
      }
    )
    if (res.statusCode === 405) {
      setError('You are not allowed to access this pages!')
    } else if (res.ok) {
      const data = await res.json()
      if (data) {
        await setToken(data.token)
        navigate('/admin')
      }
    }
  }
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <GoogleLogin
        clientId={
          window.location.hostname === 'localhost'
            ? '1010777994659-c0e9tob38lbmohe1abp966ik9v44h76o.apps.googleusercontent.com'
            : '1010777994659-bc7apgtst6dclnu9in97mah9tqkk2usa.apps.googleusercontent.com'
        }
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
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
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Login
