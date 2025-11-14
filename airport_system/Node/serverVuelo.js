import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const JAVA_API = "http://localhost:8080/system/vuelos";

app.get("/vuelos/listar", async (req, res) => {
    try {
        const response = await axios.get(`${JAVA_API}/listar`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error listando vuelos" });
    }
});

app.post("/vuelos/registrar", async (req, res) => {
    try {
        const response = await axios.post(`${JAVA_API}/registrar`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error registrando vuelo" });
    }
});

app.delete("/vuelos/eliminar/:id", async (req, res) => {
    try {
        const response = await axios.delete(`${JAVA_API}/eliminar/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error eliminando vuelo" });
    }
});

app.put("/vuelos/actualizar/:id", async (req, res) => {
    try {
        const response = await axios.put(
            `${JAVA_API}/actualizar/${req.params.id}`,
            req.body
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error actualizando vuelo" });
    }
});

app.patch("/vuelos/:id/estado", async (req, res) => {
    try {
        const response = await axios.patch(
            `${JAVA_API}/${req.params.id}/estado`,
            req.body
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error cambiando estado del vuelo" });
    }
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Servidor Node corriendo en http://localhost:${PORT}`);
});
