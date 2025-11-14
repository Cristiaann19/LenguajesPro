import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import {login} from '../api/authApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login({ email, password });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      
      toast.success(response.data.mensaje || 'Login exitoso');
      
      if (response.data.usuario.rol === 'ADMIN') {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/index', { replace: true });
      }
    } catch (error: any) {
      console.error('Error en login:', error);
      toast.error(error.response?.data?.mensaje || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <img src="/images/latam-airlines.svg" alt="" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Latam AirLines</h1>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
          Bienvenido de vuelta
        </h2>
        <p className="text-gray-600 text-sm mb-8">
          Inicia sesión para gestionar tus vuelos y descubrir nuevos destinos.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@outlook.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">
                Contraseña
              </label>
              <button 
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduce tu contraseña"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700 cursor-pointer">
              Recordarme
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">O inicia sesión con</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿No tienes una cuenta?{' '}
          <button 
            onClick={() => navigate('/registro')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}