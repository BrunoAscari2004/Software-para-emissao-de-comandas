import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/auth/authSlice';
import nlBaseUsuariosReducer from './modules/nl/nlBaseUsuariosSlice';
import nlBaseUsuarioReducer from './modules/nl/nlBaseUsuarioSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        nlBaseUsuarios: nlBaseUsuariosReducer,
        nlBaseUsuario: nlBaseUsuarioReducer,
    },
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;

export default store;
