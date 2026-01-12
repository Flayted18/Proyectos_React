/* eslint-disable react/react-in-jsx-scope */
import { useMemo, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { SortBy } from './types.d'
import { useUsers } from './hooks/useUsers'

function App() {
  const { users, isLoading, isError, refetch, fetchNextPage, hasNextPage, removeUser } = useUsers()
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (id: string) => {
    removeUser(id)
  }

  const handleRestore = async () => {
    await refetch()
  }
  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

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
        {users.length > 0 && <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />}

        {isLoading && <p>Cargando...</p>}
        {isError && <p>Error al cargar los usuarios</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
        {!isLoading && !isError && hasNextPage && <button onClick={() => { void fetchNextPage() }}>Cargar más resultados</button>}
      </main>
    </div>
  )
}
export default App
