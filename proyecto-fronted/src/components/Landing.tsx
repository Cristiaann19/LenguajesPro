import { useState } from 'react';
import { Menu, X, Facebook, Twitter, Instagram } from 'lucide-react';

export default function AirlineLanding() {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const destinations = [
        {
            city: 'París, Francia',
            image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&h=300&fit=crop',
            description: 'Descubre la ciudad del amor y la luz. Vuelos desde $499.',
            price: '$499'
        },
        {
            city: 'Santorini, Grecia',
            image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&h=300&fit=crop',
            description: 'Relájate en las playas y admira sus icónicas vistas. Desde $650.',
            price: '$650'
        },
        {
            city: 'Tokio, Japón',
            image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
            description: 'Sumérgete en la cultura y la tecnología de la capital nipona. Vuela desde $820.',
            price: '$820'
        }
    ];

    const popularDestinations = [
        {
            name: 'Dubái',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop'
        },
        {
            name: 'Roma',
            image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop'
        },
        {
            name: 'Nueva York',
            image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop'
        },
        {
            name: 'Sidney',
            image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <a href="/">
                                <img src="/images/Logo.png" alt="Logo" className="w-[170px]" />
                            </a>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="/" className="text-gray-700 hover:text-blue-600">Buscar Vuelos</a>
                            <a href="#" className="text-gray-700 hover:text-blue-600">Mis Viajes</a>
                            <a href="#" className="text-gray-700 hover:text-blue-600">Check-in</a>
                            <a href="#" className="text-gray-700 hover:text-blue-600">Información</a>
                            <a href="#" className="text-gray-700 hover:text-blue-600">Ofertas</a>
                            <a href="/login" className="text-blue-600 hover:text-blue-700">Iniciar Sesión</a>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
                                onClick={()=> window.location.href = '/registro'}
                            >
                                Registrarse
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
                            <a href="#" className="block text-gray-700">Buscar Vuelos</a>
                            <a href="#" className="block text-gray-700">Mis Viajes</a>
                            <a href="#" className="block text-gray-700">Check-in</a>
                            <a href="#" className="block text-gray-700">Información</a>
                            <a href="#" className="block text-gray-700">Ofertas</a>
                            <a href="#" className="block text-blue-600">Iniciar Sesión</a>
                            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                                onClick={()=> window.location.href = '/registro'}
                            >
                                Registrarse
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="relative h-[500px] mt-16">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/50">
                    <img
                        src="/images/landing.webp"
                        alt="Hero"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Descubre tu próximo destino
                    </h1>
                    <p className="text-xl text-white/90 mb-8">
                        Vuela con nosotros y vive una experiencia inolvidable. Seguridad, confort y los mejores precios a tu alcance.
                    </p>

                </div>
            </div>

            {/* Special Offers */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Ofertas que no puedes dejar pasar
                    </h2>
                    <p className="text-gray-600">
                        Vuela a tu destino soñado con nuestros precios especiales.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {destinations.map((dest, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <img
                                src={dest.image}
                                alt={dest.city}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{dest.city}</h3>
                                <p className="text-gray-600 mb-4">{dest.description}</p>
                                <button className="text-blue-600 font-medium hover:text-blue-700">
                                    Ver más →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Destinations */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Explora nuestros destinos más populares
                        </h2>
                        <p className="text-gray-600">
                            ¿A dónde te llevará tu próxima aventura?
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularDestinations.map((dest, idx) => (
                            <div key={idx} className="relative rounded-xl overflow-hidden h-64 group cursor-pointer">
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                    <h3 className="text-white text-2xl font-bold p-6">{dest.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="font-bold mb-4">Sobre nosotros</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Nuestra compañía</a></li>
                                <li><a href="#" className="hover:text-white">Prensa</a></li>
                                <li><a href="#" className="hover:text-white">Carreras</a></li>
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
                            <h3 className="font-bold mb-4">Síguenos</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Facebook className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Twitter className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Instagram className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>© 2024 AirlineLogo. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}