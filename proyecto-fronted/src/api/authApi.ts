import axios from "axios";

const API_URL = "http://localhost:8080/system/auth";

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
    return await axios.post<AuthResponse>(`${API_URL}/login`, data);
};

export const registro = async (data: RegistroRequest) => {
    return await axios.post<AuthResponse>(`${API_URL}/registro`, data);
};