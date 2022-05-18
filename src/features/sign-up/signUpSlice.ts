import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import {signup} from "../../services/user";


export enum Pane {
    Basic, Password, Success
}

export interface User {
    name?: string,
    email?: string,
    password?: string,
    password_confirmation?: string,
}

export interface SignUpState{
    user?: User | null;
    displayedCardPane: Pane;
    creatingUser: boolean;
}

const initialState: SignUpState = {
    displayedCardPane: Pane.Basic,
    user: null,
    creatingUser: false,
}

export const signupUser = createAsyncThunk(
    'signup/signupUser',
    async (data: Pick<User, 'name' | 'email' | 'password'>) => {
        const response = await signup(data);
        return response.data;
    }
);

export const SignUpSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setUserDetails(state, action: PayloadAction<Partial<User>>){
            state.user = {...state.user, ...action.payload}
        },

        switchPane(state, action: PayloadAction<Pane>){
            state.displayedCardPane = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.creatingUser = true;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.creatingUser = false;
                state.user =  action.payload.data.user;
                state.displayedCardPane = Pane.Success
            })
            .addCase(signupUser.rejected, (state) => {
                state.creatingUser = false;
            });
    },
})


export const { setUserDetails, switchPane } = SignUpSlice.actions

export const selectDisplayedCardPane = (state: RootState) => state.signUp.displayedCardPane;


export default SignUpSlice.reducer;