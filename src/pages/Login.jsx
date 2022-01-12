import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router-dom'

const publicVapidKey =
  'BBzU8gyT6nNAzkG80b757TrsWW4LZ_BeI0htp7QflaOZLkerSceTXFKFZdd3j6TLgG95PxdG0HD9jg8MOnu2Hkg'

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log('Registering service worker...')
  navigator.serviceWorker
    .register('../worker.js')
    .then(async function (register) {
      // Successful registration
      console.log('Hooray. Registration successful, scope is:', register.scope)
      console.log('Service Worker Registered...')

      // Register Push
      console.log('Registering Push...')
      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      })
      console.log('Push Registered...')

      // Send Push Notification
      console.log('Sending Push...')
      await fetch(
        'https://founders-backend.shakhzodbekkakh.repl.co/subscribe',
        {
          method: 'POST',
          body: JSON.stringify(subscription),
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      console.log('Push Sent...')
      console.log(register)
    })
    .catch(function (err) {
      // Failed registration, service worker won’t be installed
      console.log('Whoops. Service worker registration failed, error:', err)
      throw err
    })
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const Login = ({ token, setToken }) => {
  const navigate = useNavigate()
  const responseGoogle = async (gRes) => {
    console.log(gRes)
    const email = await gRes.yu.nv
    const id = await gRes.googleId
    //Validate inputs
    if (!(email && id)) {
      return alert('All inputs must be filled!')
    }

    const user = JSON.stringify({ email, id })

    const res = await fetch(
      'https://founders-backend.shakhzodbekkakh.repl.co/login',
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
      // Check for service worker
      if ('serviceWorker' in navigator) {
        send()
          .then(async () => {
            await setToken(data.token)
            navigate('/admin')
          })
          .catch((err) => console.error(err))
      }
    }
  }
  return (
    <div>
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
