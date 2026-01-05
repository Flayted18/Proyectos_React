import {configureStore, type Middleware} from '@reduxjs/toolkit'
import userReducer  from './users/slice'

const persistanceLocalStorage: Middleware = (store) => (next) => (action) => {
    next(action)
    localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
};

export const store = configureStore({
    reducer: {
        users: userReducer,
    },
    middleware: (GetDefaultMiddleware) => {
        return GetDefaultMiddleware().concat(persistanceLocalStorage)

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch