import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router-dom'

const Login = ({ setToken }) => {
  const navigate = useNavigate()
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
    const data = await res.json()
    if (data) {
      await setToken(data.token)
      navigate('/admin')
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
    </div>
  )
}

export default Login
