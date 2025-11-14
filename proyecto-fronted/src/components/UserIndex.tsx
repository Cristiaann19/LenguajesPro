import { useState, useEffect } from 'react';
import { Menu, X, LogOut, User, Calendar, Plane, Search } from 'lucide-react';

interface Usuario {
    idUsuario: number;
    email: string;
    nombreCompleto: string;
    rol: string;
}

interface Destino {
    idDestino: number;
    ciudad: string;
    imagen: string;
    descripcion: string;
    precio: number;
    disponible: boolean;
}

export default function UserIndex() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [destinations, setDestinations] = useState<Destino[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const usuarioString = localStorage.getItem('usuario');
        if (usuarioString) {
            setUsuario(JSON.parse(usuarioString));
        }
    }, []);

    useEffect(() => {
        const fetchDestinos = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3003/destinos');
                
                if (!response.ok) {
                    throw new Error('Error al cargar los destinos');
                }
                
                const data = await response.json();
                setDestinations(data);
                setError(null);
            } catch (err) {
                console.error('Error al cargar destinos:', err);
                setError('No se pudieron cargar los destinos. Verifica que el servidor esté corriendo.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchDestinos();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <img src="/images/Logo.png" alt="Logo" className="w-[170px]" />
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="/index" className="text-blue-600 font-semibold border-b-2 border-blue-600">Buscar Vuelos</a>
                            <a href="#" className="text-gray-700 hover:text-blue-600">Mis Reservas</a>
                            <a href="#" className="text-gray-700 hover:text-blue-600">Check-in</a>
                            
                            {usuario && (
                                <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
                                    <User className="w-5 h-5 text-gray-600" />
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-gray-800">{usuario.nombreCompleto}</p>
                                        <p className="text-xs text-gray-500">{usuario.rol}</p>
                                    </div>
                                </div>
                            )}

                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-red-600 hover:text-red-700 cursor-pointer"
                            >
                                <LogOut className="w-5 h-5" />
                                Salir
                            </button>
                        </div>

                        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-4 py-3 space-y-3">
                            {usuario && (
                                <div className="flex items-center gap-3 pb-3 border-b">
                                    <User className="w-8 h-8 text-gray-600" />
                                    <div>
                                        <p className="font-semibold text-gray-800">{usuario.nombreCompleto}</p>
                                        <p className="text-sm text-gray-500">{usuario.email}</p>
                                    </div>
                                </div>
                            )}
                            <a href="/index" className="block text-blue-600 font-semibold">Buscar Vuelos</a>
                            <a href="#" className="block text-gray-700">Mis Reservas</a>
                            <a href="#" className="block text-gray-700">Check-in</a>
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left text-red-600 py-2 cursor-pointer"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="relative h-[400px] mt-16 bg-gradient-to-r from-blue-600 to-blue-800">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-900/50">
                    <img
                        src="/images/landing.webp"
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        ¡Hola, {usuario?.nombreCompleto?.split(' ')[0] || 'Viajero'}!
                    </h1>
                    <p className="text-xl text-white/90 mb-8">
                        Encuentra tu próximo destino y reserva con los mejores precios
                    </p>
                    
                    {/* Buscador rápido */}
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-4xl">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <input 
                                type="text" 
                                placeholder="Origen"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input 
                                type="text" 
                                placeholder="Destino"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input 
                                type="date"
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center cursor-pointer gap-2 font-semibold">
                                <Search className="w-5 h-5" />
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mis Estadísticas */}
            <section className="max-w-7xl mx-auto px-4 py-8 -mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 pt-4 gap-6">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Plane className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Vuelos Reservados</p>
                                <p className="text-2xl font-bold text-gray-800">0</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Próximos Viajes</p>
                                <p className="text-2xl font-bold text-gray-800">0</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <User className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Puntos Acumulados</p>
                                <p className="text-2xl font-bold text-gray-800">0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vuelos Disponibles */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Vuelos disponibles para ti
                    </h2>
                    <p className="text-gray-600">
                        Selecciona tu destino y reserva hoy mismo
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                        <p className="text-red-700 text-center">{error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Cargando destinos...</p>
                    </div>
                ) : destinations.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No hay destinos disponibles en este momento.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {destinations.map((dest) => (
                            <div key={dest.idDestino} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="relative">
                                    <img
                                        src={dest.imagen || 'https://via.placeholder.com/400x300?text=Sin+Imagen'}
                                        alt={dest.ciudad}
                                        className="w-full h-48 object-cover"
                                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Sin+Imagen';
                                        }}
                                    />
                                    {!dest.disponible && (
                                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            Agotado
                                        </div>
                                    )}
                                    {dest.disponible && (
                                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            Disponible
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{dest.ciudad}</h3>
                                    <p className="text-gray-600 mb-4">{dest.descripcion}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-blue-600">${dest.precio}</span>
                                        <button 
                                            disabled={!dest.disponible}
                                            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                                                dest.disponible 
                                                ? 'btn-reservar' 
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            {dest.disponible ? 'Reservar' : 'No disponible'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="font-bold mb-4">Mi Cuenta</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Mis Reservas</a></li>
                                <li><a href="#" className="hover:text-white">Mi Perfil</a></li>
                                <li><a href="#" className="hover:text-white">Historial de Vuelos</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Soporte</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Contacto</a></li>
                                <li><a href="#" className="hover:text-white">Preguntas frecuentes</a></li>
                                <li><a href="#" className="hover:text-white">Política de equipaje</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Legal</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Términos y condiciones</a></li>
                                <li><a href="#" className="hover:text-white">Política de privacidad</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">Usuario</h3>
                            <div className="text-gray-400">
                                <p className="mb-2">{usuario?.nombreCompleto || 'Invitado'}</p>
                                <button 
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>© 2024 AirLatam. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}