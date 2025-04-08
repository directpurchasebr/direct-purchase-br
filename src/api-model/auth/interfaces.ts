export interface UsuarioLogado {
    nome: string;
    email: string;
    accessToken: string;
    login: string;
    roles: string[];
    sessionId?: string;
}