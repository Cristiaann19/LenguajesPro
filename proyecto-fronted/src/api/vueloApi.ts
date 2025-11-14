import axios from "axios";

const API_NODE = "http://localhost:3002/vuelos";

export const listarVuelos = () => axios.get(`${API_NODE}/listar`);
export const registrarVuelo = (data: any) => axios.post(`${API_NODE}/registrar`, data);
export const eliminarVuelo = (id: number) => axios.delete(`${API_NODE}/eliminar/${id}`);
export const actualizarVuelo = (id: number, vuelo: any) => axios.put(`${API_NODE}/actualizar/${id}`, vuelo);
export const cambiarEstadoVuelo = (id: number, nuevoEstado: string) =>
axios.patch(`${API_NODE}/${id}/estado`, { estado: nuevoEstado });
