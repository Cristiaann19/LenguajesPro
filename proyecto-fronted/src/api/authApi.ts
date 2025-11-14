import axios from "axios";

const API_NODE = "http://localhost:3001/auth";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegistroRequest {
    email: string;
    password: string;
    nombreCompleto: string;
}

export interface Usuario {
    idUsuario: number;
    email: string;
    nombreCompleto: string;
    rol: string;
}

export interface AuthResponse {
    token: string;
    usuario: Usuario;
    mensaje: string;
}

export const login = async (data: LoginRequest) => {
    return await axios.post<AuthResponse>(`${API_NODE}/login`, data);
};

export const registro = async (data: RegistroRequest) => {
    return await axios.post<AuthResponse>(`${API_NODE}/registro`, data);
};