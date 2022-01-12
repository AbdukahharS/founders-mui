import React from 'react'
import { useNavigate } from 'react-router-dom'

const localStorage = window.localStorage

const Admin = ({ token }) => {
  const navigate = useNavigate()

  const checkToken = async () => {
    try {
      const res = await fetch(
        'https://founders-backend.shakhzodbekkakh.repl.co/welcome',
        {
          method: 'POST',
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        }
      ).catch((err) => {
        console.log(err)
      })
      const data = await res.json()
      if (data.message !== 'valid') {
        localStorage.removeItem('token')
        navigate('/admin/login')
      }
    } catch (err) {
      console.error(err)
    }
  }

  checkToken()

  return (
    <main>
      <h1>Admin</h1>
    </main>
  )
}

export default Admin
