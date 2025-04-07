export interface Usuario {
    nome: string;
    email: string;
    accessToken: string;
    login: string;
    roles: string[];
    sessionId?: string;
}