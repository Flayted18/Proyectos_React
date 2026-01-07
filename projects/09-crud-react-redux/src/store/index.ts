import {configureStore, type Middleware, type UnknownAction} from '@reduxjs/toolkit'
import userReducer, { rollbackUser, type UserWithId }  from './users/slice'
import { toast } from 'sonner';

const persistanceLocalStorage: Middleware = (store) => (next) => (action) => {
    next(action)
    localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
};

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
    //Fase 1
    const { type, payload } = action as UnknownAction
    const usersBefore: number = store.getState().users.length
    // console.log('antes', usersBefore, store.getState().users)
    const previousState = store.getState() as RootState
    
    next(action)
    //Fase 2
    const usersAfter: number = store.getState().users.length
    // console.log('despues', usersAfter, store.getState().users)
    // console.log('payload despues', payload)

    if (type === 'users/deleteUserById') {

        const userIdToRemove = payload
        const userToRemove = previousState.users.find(user => user.id === userIdToRemove)

        fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
            method: 'DELETE',
        })
            .then(res =>{
                if(res.ok) {
                    toast.success(`El usuario ${userIdToRemove} fue eliminado correctamente`)
                }
            })
            .catch(err => {
                if(userToRemove) store.dispatch(rollbackUser(userToRemove))
                toast.error(`Has tenido este error: ${err}`)
            })
    }

    if (type === 'users/addNewUser') {
        if (usersAfter > usersBefore) {
            toast.success(`El usuario se ha ingresado correctamente!`)
        } else {
            toast.error('No logramos añadir el usuario nuevo')
        }
    }

    if (type === 'users/updateUser'){
        const updatedUser = payload as UserWithId
        const userId = updatedUser.id

        toast.success(`Usuario: ${userId} actualizado correctamente`)
    }
}

export const store = configureStore({
    reducer: {
        users: userReducer,
    },
    middleware: (GetDefaultMiddleware) => {
        return GetDefaultMiddleware().concat(persistanceLocalStorage, syncWithDatabase)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch