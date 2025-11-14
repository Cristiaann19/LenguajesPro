import { spawn } from "child_process";

function startServer(nombre,ruta, puerto){
    console.log(`Iniciando ${nombre} `)

    const proceso = spawn("node", [ruta],{
        shell: true,
        stdio: "inherit"
    });

    proceso.on("close", (code) => {
        console.log(`${nombre} se cerro el codigo ${code}`);
    })

    console.log(`${nombre} corriendo en http://localhost:${puerto}`);
}

startServer(
    "Server Login",
    "./serverLogin.js",
    3001
);

startServer(
    "Server Vuelos",
    "./serverVuelo.js",
    3002
);

startServer(
    "Server Destino",
    "./serverDestinos.js",
    3003
);

console.log("\n Todos los servidores estan iniciados")