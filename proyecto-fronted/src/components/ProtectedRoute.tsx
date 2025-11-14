import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const token = localStorage.getItem('token');
    const usuarioString = localStorage.getItem('usuario');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!usuarioString) {
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    try {
        const usuario = JSON.parse(usuarioString);

        if (requiredRole && usuario.rol !== requiredRole) {
            if (usuario.rol === 'USER') {
                return <Navigate to="/index" replace />;
            }
            if (usuario.rol === 'ADMIN') {
                return <Navigate to="/dashboard" replace />;
            }
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