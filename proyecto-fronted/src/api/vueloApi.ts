import axios from "axios";

const API_URL = "http://localhost:8080/system/vuelos";

export const listarVuelos = () => axios.get(`${API_URL}/listar`);
export const registrarVuelo = (data: any) => axios.post(`${API_URL}/registrar`, data);
export const eliminarVuelo = (id: number) => axios.delete(`${API_URL}/eliminar/${id}`);
export const actualizarVuelo = async (id: number, vuelo: any) => {
    return await axios.put(`${API_URL}/actualizar/${id}`, vuelo);
};

export const cambiarEstadoVuelo = async (id: number, nuevoEstado: string) => {
    return await axios.patch(`${API_URL}/${id}/estado`, { estado: nuevoEstado });
};