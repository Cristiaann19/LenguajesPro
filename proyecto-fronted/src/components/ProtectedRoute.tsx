import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const token = localStorage.getItem('token');
    const usuarioString = localStorage.getItem('usuario');

    // Si no hay token, redirige al login (no al landing)
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!usuarioString) {
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    try {
        const usuario = JSON.parse(usuarioString);

        // Si requiere un rol específico y no coincide
        if (requiredRole && usuario.rol !== requiredRole) {
            // Si es USER intentando acceder a ADMIN, redirige a /index
            if (usuario.rol === 'USER') {
                return <Navigate to="/index" replace />;
            }
            // Si es ADMIN intentando acceder a USER, redirige a /dashboard
            if (usuario.rol === 'ADMIN') {
                return <Navigate to="/dashboard" replace />;
            }
            // Cualquier otro caso, redirige al login
            return <Navigate to="/login" replace />;
        }

        return <>{children}</>;
    } catch (error) {
        console.error('Error parsing usuario:', error);
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;