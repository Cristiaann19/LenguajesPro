import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/Login"
import Registro from "./components/Registro"
import UserIndex from "./components/UserIndex"
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública - Landing */}
        <Route path="/" element={<Landing />} />
        
        {/* Rutas de autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Ruta para usuarios normales (USER) - Ver vuelos y reservar */}
        <Route
          path="/index"
          element={
            <ProtectedRoute requiredRole="USER">
              <UserIndex />
            </ProtectedRoute>
          }
        />

        {/* Ruta para administradores (ADMIN) - Gestión completa */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Ruta 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;