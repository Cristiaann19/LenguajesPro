import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const JAVA_API = "http://localhost:8080/system/destinos";


app.get("/destinos", async (req, res) => {
    try {
        const response = await axios.get(`${JAVA_API}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo destinos" });
    }
});

app.get("/destinos/disponibles", async (req, res) => {
    try {
        const response = await axios.get(`${JAVA_API}/disponibles`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo destinos disponibles" });
    }
});

app.get("/destinos/:id", async (req, res) => {
    try {
        const response = await axios.get(`${JAVA_API}/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo destino por ID" });
    }
});

app.post("/destinos", async (req, res) => {
    try {
        const response = await axios.post(`${JAVA_API}`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error creando destino" });
    }
});

app.put("/destinos/:id", async (req, res) => {
    try {
        const response = await axios.put(`${JAVA_API}/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error actualizando destino" });
    }
});

app.delete("/destinos/:id", async (req, res) => {
    try {
        const response = await axios.delete(`${JAVA_API}/${req.params.id}`);
        res.json({ mensaje: "Destino eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error eliminando destino" });
    }
});

app.get("/destinos/buscar", async (req, res) => {
    try {
        const response = await axios.get(`${JAVA_API}/buscar`, {
            params: { ciudad: req.query.ciudad },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error buscando destino por ciudad" });
    }
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Servidor Node corriendo en http://localhost:${PORT}`);
});
