import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const JAVA_API = "http://localhost:8080/system/auth";

app.post("/auth/login", async (req, res) => {
    try {
        const respuesta = await axios.post(`${JAVA_API}/login`, req.body);
        res.json(respuesta.data);
    } catch (error) {
        console.error("Error en login (Node):", error.message);

        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        res.status(500).json({ error: "Error conectando con el servidor Java" });
    }
});

app.post("/auth/registro", async (req, res) => {
    try {
        const respuesta = await axios.post(`${JAVA_API}/registro`, req.body);
        res.json(respuesta.data);
    } catch (error) {
        console.error("Error en registro (Node):", error.message);

        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        res.status(500).json({ error: "Error conectando con el servidor Java" });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor Node corriendo en http://localhost:${PORT} `);
});
