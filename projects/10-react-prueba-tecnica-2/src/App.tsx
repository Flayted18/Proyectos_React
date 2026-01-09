/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res => json())
      .then(res => {
        setUsers(res.result.data)
      }

      )
  }, [])

  return (
    <>
      <h1>Prueba tecnica 55k</h1>
    </>
  )
}

export default App
