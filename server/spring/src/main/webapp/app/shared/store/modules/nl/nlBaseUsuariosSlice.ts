import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import INlBaseUsuarios from '@shared/@types/nl/INlBaseUsuarios';
import api from '@shared/services/api';

export const getNlBaseUsuarios = createAsyncThunk(
    'app/nlBaseUsuarios/getNlBaseUsuarios',
    async (payload, { dispatch, getState }) => {
        try {
            const response = await api.get<INlBaseUsuarios[]>(`api/nlBaseUsuarios`);

            return response.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    },
);

export const getNlBaseUsuariosByFilter = createAsyncThunk(
    'app/nlBaseUsuarios/getNlBaseUsuariosByFilter',
    async (payload: Partial<INlBaseUsuarios>, { dispatch, getState }) => {
        const { desEmail, desUsuario, idUsuario, dtaAlteracao, dtaCriacao } = payload;

        try {
            const response = await api.post<INlBaseUsuarios[]>(`api/nlBaseUsuarios/search`, {
                desEmail,
                idUsuario,
                desUsuario,
                dtaAlteracao,
                dtaCriacao,
            });

            return response.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    },
);

export const nlBaseUsuarioSlice = createSlice({
    name: 'app/nlBaseUsuarios',
    initialState: {
        nlBaseUsuarios: [] as INlBaseUsuarios[],
    },
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            isAnyOf(getNlBaseUsuarios.fulfilled, getNlBaseUsuariosByFilter.fulfilled),
            (state, action) => {
                state.nlBaseUsuarios = action.payload;
            },
        );
    },
});

export default nlBaseUsuarioSlice.reducer;
