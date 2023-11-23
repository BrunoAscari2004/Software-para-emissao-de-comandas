export interface User {
    email: string;
    auth: string | string[];
    name?: string;
    codPerfilFk?: {
        codPerfil: number;
        desPerfil: string;
    };
}

export interface IJwtPayload {
    sub: string;
    auth: string;
    exp: number;
}

export interface ILoginParams {
    email: string;
    password: string;
}
