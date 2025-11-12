import { useState , useEffect} from 'react';
import { Plane, Users, Calendar, CreditCard, Menu, LogOut } from 'lucide-react';
import GestionVuelos from './GestionVuelos';
import GestionInicio from './GestionInicio';
import { useNavigate } from 'react-router-dom';


interface Usuario {
  idUsuario: number;
  email: string;
  nombreCompleto: string;
  rol: string;
}

export default function AirlineDashboard() {
    const [currentView, setCurrentView] = useState(() => {
        return localStorage.getItem('currentView') || 'inicio';
    });

    const [usuario, setUsuario] = useState<Usuario | null>(null);
    useEffect(() => {
            const usuarioString = localStorage.getItem('usuario');
            if (usuarioString) {
                setUsuario(JSON.parse(usuarioString));
            }
        }, []);

    const cambiarVista = (vista: string) => {
        setCurrentView(vista);
        localStorage.setItem('currentView', vista);
    };

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-slate-900 text-white">
            {/* Sidebar */}
            <div className="w-64 bg-slate-800 border-r border-slate-700">
                {/* Logo */}
                <div className="p-6 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10  flex items-center justify-center">
                            <img src="/images/latam-airlines.svg" alt="" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg">Latam AirLines</h1>
                            <p className="text-xs text-slate-400">Panel Administrativo</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                    <button
                        onClick={() => cambiarVista('inicio')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${currentView === 'inicio' ? 'bg-blue-600' : 'hover:bg-slate-700'
                            }`}
                    >
                        <Menu className="w-5 h-5" />
                        <span>Inicio</span>
                    </button>
                    <button
                        onClick={() => cambiarVista('vuelos')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${currentView === 'vuelos' ? 'bg-blue-600' : 'hover:bg-slate-700'
                            }`}
                    >
                        <Plane className="w-5 h-5" />
                        <span>Vuelos</span>
                    </button>
                    <button
                        onClick={() => cambiarVista('usuarios')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${currentView === 'tripulacion' ? 'bg-blue-600' : 'hover:bg-slate-700'
                            }`}
                    >
                        <Users className="w-5 h-5" />
                        <span>Usuarios</span>
                    </button>
                    <button
                        onClick={() => cambiarVista('reservas')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${currentView === 'reservas' ? 'bg-blue-600' : 'hover:bg-slate-700'
                            }`}
                    >
                        <Calendar className="w-5 h-5" />
                        <span>Reservas</span>
                    </button>
                    <button
                        onClick={() => cambiarVista('pagos')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${currentView === 'pagos' ? 'bg-blue-600' : 'hover:bg-slate-700'
                            }`}
                    >
                        <CreditCard className="w-5 h-5" />
                        <span>Pagos</span>
                    </button>
                    <button
                        onClick={() => cambiarVista('ventas')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${currentView === 'ventas' ? 'bg-blue-600' : 'hover:bg-slate-700'
                            }`}
                    >
                        <CreditCard className="w-5 h-5" />
                        <span>Ventas</span>
                    </button>
                    <button
                        onClick={() => cambiarVista('slider')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${currentView === 'slider' ? 'bg-blue-600' : 'hover:bg-slate-700'
                            }`}
                    >
                        <CreditCard className="w-5 h-5" />
                        <span>Slider</span>
                    </button>
                </nav>

                {/* Bottom Profile */}
                <div className="absolute bottom-0 w-64 p-4 border-t border-slate-700">
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 rounded-lg mb-2 transition-colors">
                        <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                            <span className="text-sm">A</span>
                        </div>
                        <div className="text-left">
                            <p className="text-lg font-semibold text-white-800">{usuario?.nombreCompleto}</p>
                            <p className="text-xs text-gray-500">{usuario?.rol}</p>
                        </div>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 rounded-lg transition-colors"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Header */}
                <div className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Menu className="w-6 h-6" />
                        <h2 className="text-xl font-semibold">
                            {currentView === 'inicio' && 'Dashboard de Inicio'}
                            {currentView === 'vuelos' && 'Gestión de Vuelos'}
                            {currentView === 'usuarios' && 'Gestión de Usuarios'}
                            {currentView === 'reservas' && 'Gestión de Reservas'}
                            {currentView === 'pagos' && 'Gestión de Pagos'}
                            {currentView === 'slider' && 'Gestión de Slider'}
                            {currentView === 'ventas' && 'Gestión de Ventas'}
                        </h2>
                    </div>

                </div>

                {/* Content */}
                {currentView === 'inicio' && GestionInicio()}
                {currentView === 'vuelos' && GestionVuelos()}
                {currentView === 'usuarios' && (
                    <div className="p-8 flex items-center justify-center h-full">
                        <div className="text-center">
                            <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Gestión de Usuarios</h3>
                            <p className="text-slate-400">Esta sección está en desarrollo</p>
                        </div>
                    </div>
                )}
                {currentView === 'reservas' && (
                    <div className="p-8 flex items-center justify-center h-full">
                        <div className="text-center">
                            <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Gestión de Reservas</h3>
                            <p className="text-slate-400">Esta sección está en desarrollo</p>
                        </div>
                    </div>
                )}
                {currentView === 'pagos' && (
                    <div className="p-8 flex items-center justify-center h-full">
                        <div className="text-center">
                            <CreditCard className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Gestión de Pagos</h3>
                            <p className="text-slate-400">Esta sección está en desarrollo</p>
                        </div>
                    </div>
                )}
                {currentView === 'slider' && (
                    <div className="p-8 flex items-center justify-center h-full">
                        <div className="text-center">
                            <CreditCard className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Gestión de Slider</h3>
                            <p className="text-slate-400">Esta sección está en desarrollo</p>
                        </div>
                    </div>
                )}
                {currentView === 'ventas' && (
                    <div className="p-8 flex items-center justify-center h-full">
                        <div className="text-center">
                            <CreditCard className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Gestión de Ventas</h3>
                            <p className="text-slate-400">Esta sección está en desarrollo</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}