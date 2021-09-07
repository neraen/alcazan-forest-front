import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import UsersApi from "../../services/UsersApi";

export const moveSlice = createSlice({
    name: 'move',
    initialState: {
        abscisseJoueur: 0,
        ordonneeJoueur: 0,
        id
    },
    reducers: {
        up: state => {
            state.ordonneeJoueur -= 1
        },
        down: state => {
            state.ordonneeJoueur += 1
        },
        left: state => {
            state.abscisseJoueur -= 1
        },
        right: state => {
            state.abscisseJoueur += 1
        }
    }
})

export const { up, down, left, right } = moveSlice.actions

export const setPlayer = (id) => this.id = id

export const getPlayer = createAsyncThunk('player', async() => {
    const response = await UsersApi.find(this.state.id)
})

export default moveSlice.reducer