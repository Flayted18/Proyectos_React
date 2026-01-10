/* eslint-disable react/react-in-jsx-scope */

import { SortBy, type User } from "../types.d"

interface Props {
   deleteUser: (id: string) => void
   changeSorting: (sort: SortBy) => void
   showColors: boolean
   users: User[]
}

export function UsersList({ users, showColors, deleteUser, changeSorting }: Props) {
   return (
      <table width='100%'>
         <thead>
            <tr>
               <th>Foto</th>
               <th className="pointer" onClick={() => changeSorting(SortBy.NAME)}>Nombre</th>
               <th className="pointer" onClick={() => changeSorting(SortBy.LAST)}>Apellido</th>
               <th className="pointer" onClick={() => changeSorting(SortBy.COUNTRY)}>Pais</th>
               <th>Acciones</th>
            </tr>
         </thead>
         <tbody>
            {
               users.map((user, index) => {
                  const backgroundColor = index % 2 === 0 ? '#333' : '#555'
                  const color = showColors ? backgroundColor : 'transparent'
                  const keyIDUUID = user.id.value === null ? user.login.uuid : user.id.value

                  return (
                     <tr key={keyIDUUID} style={{ backgroundColor: color }}>
                        <td>
                           <img src={user.picture.thumbnail} alt="" />
                        </td>
                        <td>
                           {user.name.first}
                        </td>
                        <td>
                           {user.name.last}
                        </td>
                        <td>
                           {user.location.country}
                        </td>
                        <td>
                           <button onClick={() => {
                              deleteUser(keyIDUUID)

                           }}>Borrar</button>
                        </td>
                     </tr>
                  )
               })
            }
         </tbody>
      </table>
   )
}