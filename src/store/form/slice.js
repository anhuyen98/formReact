import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userList: [],
    userEdit: undefined
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        addUser: (state, { payload }) => {
            state.userList.push(payload)
        },
        editUser: (state, { payload }) => {
            state.userEdit = payload
        },
        deleteUser: (state, { payload }) => {
            state.userList = state.userList.filter(user => user.id !== payload)
        },
        updateUser: (state, { payload }) => {
            state.userList = state.userList.map((user) => {
                if(user.id  === payload.id) return payload
                return user
            })
        }
    },
})

export const { reducer: formReducer, actions: formActions } = formSlice