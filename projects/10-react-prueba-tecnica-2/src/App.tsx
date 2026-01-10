/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

import { UsersList } from './components/UsersList'
import { SortBy, type User } from './types.d'

function App() {

  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (id: string) => {
    const filteredUsers = [...users].filter((user) => user.id.value === null ? user.login.uuid : user.id.value !== id)
    setUsers(filteredUsers)
  }

  const handleRestore = () => {
    setUsers(originalUsers.current)
  }
  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }
  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const filteredUsers = useMemo(() => {
    console.log('filteredUsers')
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    console.log('sortedUsers')

    if (sorting === SortBy.NONE) return filteredUsers
    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted(
        (a, b) => a.location.country.localeCompare(b.location.country)
      )
    }
    if (sorting === SortBy.NAME) {
      return filteredUsers.toSorted(
        (a, b) => a.name.first.localeCompare(b.name.first)
      )
    }
    if (sorting === SortBy.LAST) {
      return filteredUsers.toSorted(
        (a, b) => a.name.last.localeCompare(b.name.last)
      )
    }

    return filteredUsers
  }, [filteredUsers, sorting])

  return (
    <div className='App'>
      <h1>Prueba tecnica 55k</h1>

      <header>
        <button onClick={toggleColors} >Colorear Filas</button>
        <button onClick={toggleSortByCountry}>{sorting === SortBy.COUNTRY ? 'No ordenar por Pais' : 'Ordenar por Pais'}</button>
        <button onClick={handleRestore}>Restaurar lista</button>
        <input placeholder='Buscar por pais' onChange={(e) => setFilterCountry(e.target.value)} />
      </header>

      <main>
        <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
      </main>

    </div>
  )

}
export default App
