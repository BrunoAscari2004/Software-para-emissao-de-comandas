import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import toast from 'react-hot-toast';
import api from '@shared/services/api';
import { IJwtPayload, ILoginParams, User } from './types';

export const getLoggedUser = createAsyncThunk('app/auth/getLoggedUser', (payload, { dispatch, getState }) => {
    const jwtToken = localStorage.getItem('@nlweb/jwtToken');

    if (jwtToken) {
        const { sub: email, auth, exp } = jwtDecode<IJwtPayload>(jwtToken);

        if (Date.now() < exp * 1000) {
            return {
                email,
                auth,
            };
        } else {
            toast.error('Sua sessão expirou. Insira suas credenciais novamente.');
            throw new Error('JWT Token expired');
        }
    } else {
        throw new Error('User not logged in');
    }
});

export const login = createAsyncThunk(
    'app/auth/login',
    async ({ password, email }: ILoginParams, { dispatch, getState }) => {
        try {
            const response = await api.post(`api/authenticate/login`, {
                username: email,
                password,
            });

            const { id_token: idToken } = response.data;

            if (idToken) {
                localStorage.setItem('@nlweb/jwtToken', idToken);

                const { sub: username, auth } = jwtDecode<IJwtPayload>(idToken);

                api.defaults.headers['Authorization'] = `Bearer ${idToken}`;

                return {
                    email: username,
                    auth,
                };
            } else {
                throw new Error('Token inválido/não existe');
            }
        } catch (error) {
            toast.error('Usuário ou senha estão incorretos');
            throw new Error();
        }
    },
);

export const logout = createAsyncThunk('app/auth/logout', (val, { dispatch, getState }) => {
    localStorage.removeItem('@nlweb/jwtToken');

    return null;
});

export const authSlice = createSlice({
    name: 'app/auth',
    initialState: {
        user: {} as User,
        token: '',
        isAuthenticated: false,
        isLoading: false,
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isAuthenticated = false;
            state.isLoading = false;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
        });
        builder.addCase(getLoggedUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(logout.fulfilled, getLoggedUser.rejected), (state, action) => {
            state.isAuthenticated = false;
        });
    },
});

export default authSlice.reducer;
