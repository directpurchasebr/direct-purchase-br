export interface Usuario {
    accessToken: string;
    nome: string;
    roles: string[];
    sessionId?: string;
}