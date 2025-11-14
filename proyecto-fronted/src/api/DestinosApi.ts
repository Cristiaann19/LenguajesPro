import axios from "axios";

const API_NODE = "http://localhost:3003/destinos";

export const obtenerDestinos = () => axios.get(API_NODE);
export const obtenerDisponibles = () => axios.get(`${API_NODE}/disponibles`);
export const obtenerDestinoPorId = (id: number) => axios.get(`${API_NODE}/${id}`);
export const crearDestino = (data: any) => axios.post(API_NODE, data);
export const actualizarDestino = (id: number, data: any) =>
    axios.put(`${API_NODE}/${id}`, data);
export const eliminarDestino = (id: number) =>
    axios.delete(`${API_NODE}/${id}`);
export const buscarDestino = (ciudad: string) =>
    axios.get(`${API_NODE}/buscar`, { params: { ciudad } });
