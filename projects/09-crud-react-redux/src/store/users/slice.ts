import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
    {
        id: "1",
        name: "Yazman Rodriguez",
        email: "yazmanito@gmail.com",
        github: "midudev"
    },
    {
        id: "2",
        name: "John Doe",
        email: "iaejbf@gmail.com",
        github: "johndoe"
    },
    {
        id: "3",
        name: "Jane Smith",
        email: "jane.smith@gmail.com",
        github: "janesmith"
    },
    {
        id: "4",
        name: "Bob Johnson",
        email: "bob.johnson@gmail.com",
        github: "bobjohnson"
    }
]

export type UserId = string

export interface User{
    name: string,
    email: string,
    github: string

}


export interface UserWithId extends User{
    id: UserId,
}

const initialState: UserWithId[] = (()=> {
    const persistedState = localStorage.getItem('__redux__state__');
    if (persistedState) return JSON.parse(persistedState).users

    return DEFAULT_STATE;
})()


export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User> ) => {
            const id = crypto.randomUUID()
            return [...state, {id, ...action.payload}]
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter((user) => user.id !== id)
        },
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            const isUserAlreadyDefined = state.some(user=> user.id === action.payload.id)
            if (!isUserAlreadyDefined){
                return [...state, action.payload]
            }
        }
    },
    
})

export default userSlice.reducer
export const {addNewUser, deleteUserById, rollbackUser} = userSlice.actions