import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import INlBaseUsuarios from '@shared/@types/nl/INlBaseUsuarios';
import api from '@shared/services/api';
import toast from 'react-hot-toast';

interface ISaveNlBaseUsuario extends Omit<INlBaseUsuarios, 'idUsuario' | 'desSenha'> {
    idUsuario: number | null;
    desSenha: string | null;
}

interface IGetNlBaseUsuario {
    idUsuario: number | string;
}

const baseNlBaseUsuario: INlBaseUsuarios = {
    idUsuario: 0,
    desUsuario: '',
    desEmail: '',
    desSenha: '',
    dtaCriacao: '',
    dtaAlteracao: '',
};

export const getNlBaseUsuario = createAsyncThunk(
    'app/nlBaseUsuario/getNlBaseUsuario',
    async (payload: IGetNlBaseUsuario) => {
        const { idUsuario } = payload;
        const response = await api.get(`api/nlBaseUsuarios/${idUsuario}`);
        const data = await response.data;
        if (data) {
            return data;
        }
        const msg = `Usuário de id ${idUsuario} não existe`;
        toast.error(msg);
        throw new Error(`Usuário de id ${idUsuario} não existe`);
    },
);

export const saveNlBaseUsuario = createAsyncThunk(
    'app/nlBaseUsuario/saveNlBaseUsuario',
    async (payload: ISaveNlBaseUsuario) => {
        try {
            const { desEmail, desSenha, desUsuario, idUsuario, dtaAlteracao, dtaCriacao } = payload;

            const response = await api.post('api/nlBaseUsuarios', {
                desEmail,
                desSenha,
                desUsuario,
                idUsuario,
                dtaCriacao,
                dtaAlteracao,
            });

            return response.data;
        } catch (error) {
            throw new Error(`${error}`);
        }
    },
);

export const removeNlBaseUsuario = createAsyncThunk(
    'app/nlBaseUsuario/removeNlBaseUsuarios',
    async (idUsuario: any) => {
        await api.delete(`/api/nlBaseUsuarios/${idUsuario}`);
        return idUsuario;
    },
);

export const resetNlBaseUsuario = createAsyncThunk('app/nlBaseUsuario/resetNlBaseUsuarios', () => {
    return baseNlBaseUsuario;
});

export const nlBaseUsuarioSlice = createSlice({
    name: 'app/nlBaseUsuario',
    initialState: {
        nlBaseUsuario: baseNlBaseUsuario,
    },
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(isAnyOf(getNlBaseUsuario.fulfilled, resetNlBaseUsuario.fulfilled), (state, action) => {
            state.nlBaseUsuario = action.payload;
        });
    },
});

export default nlBaseUsuarioSlice.reducer;
