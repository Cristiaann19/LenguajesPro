import React, { useState } from 'react';
// import { Search, Plus, UserPlus, FileText } from 'lucide-react';

const DashboardPart: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState('VIE');

    const weekData = [
        { day: 'LUN', value: 30, height: '30%' },
        { day: 'MAR', value: 20, height: '20%' },
        { day: 'MIÉ', value: 50, height: '50%' },
        { day: 'JUE', value: 40, height: '40%' },
        { day: 'VIE', value: 85, height: '85%' },
        { day: 'SÁB', value: 70, height: '70%' },
        { day: 'DOM', value: 65, height: '65%' }
    ];

    const upcomingFlights = [
        { id: 'AC101', route: 'JFK → LAX', date: '25 Oct, 10:30 AM', status: 'A Tiempo', statusColor: 'text-green-400' },
        { id: 'AC205', route: 'MIA → ORD', date: '25 Oct, 2:15 PM', status: 'A Tiempo', statusColor: 'text-green-400' },
        { id: 'AC310', route: 'LAX → SEA', date: '25 Oct, 4:45 PM', status: 'Retrasado', statusColor: 'text-yellow-400' },
        { id: 'AC422', route: 'BOS → DFW', date: '25 Oct, 6:20 PM', status: 'A Tiempo', statusColor: 'text-green-400' }
    ];

    return (
        <div className="p-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm mb-2">Vuelos Programados Hoy</p>
                    <h3 className="text-4xl font-bold mb-2">42</h3>
                    <p className="text-green-400 text-sm">+5.2% vs ayer</p>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm mb-2">Ingresos del Mes</p>
                    <h3 className="text-4xl font-bold mb-2">$1.2M</h3>
                    <p className="text-green-400 text-sm">+8.1% vs mes anterior</p>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm mb-2">Reservas Pendientes</p>
                    <h3 className="text-4xl font-bold mb-2">128</h3>
                    <p className="text-red-400 text-sm">-1.5% vs ayer</p>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <p className="text-slate-400 text-sm mb-2">Tripulación Activa</p>
                    <h3 className="text-4xl font-bold mb-2">215</h3>
                    <p className="text-green-400 text-sm">+2.0% vs semana anterior</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Chart */}
                <div className="col-span-3 bg-slate-800 border border-slate-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-1">Reservas por Día</h3>
                            <p className="text-slate-400 text-sm">Últimos 7 días <span className="text-green-400">+12.5%</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-bold">1,234</p>
                        </div>
                    </div>
                    <div className="flex items-end justify-between gap-4 h-64">
                        {weekData.map((item) => (
                            <div key={item.day} className="flex-1 flex flex-col items-center">
                                <div className="w-full flex items-end justify-center" style={{ height: '100%' }}>
                                    <div
                                        className={`w-full rounded-t-lg transition-all cursor-pointer ${item.day === selectedDay ? 'bg-blue-500' : 'bg-slate-700 hover:bg-slate-600'}`}
                                        style={{ height: item.height }}
                                        onClick={() => setSelectedDay(item.day)}
                                    />
                                </div>
                                <p className="text-slate-400 text-sm mt-3">{item.day}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Upcoming Flights Table */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Próximos Vuelos</h3>
                    <button className="text-blue-400 hover:text-blue-300 text-sm">
                        Ver todos
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">Nº VUELO</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">RUTA</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">FECHA / HORA</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">ESTADO</th>
                                <th className="text-left py-3 px-4 text-slate-400 font-medium text-sm">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingFlights.map((flight) => (
                                <tr key={flight.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                                    <td className="py-4 px-4 text-blue-400 font-medium">{flight.id}</td>
                                    <td className="py-4 px-4">{flight.route}</td>
                                    <td className="py-4 px-4 text-slate-300">{flight.date}</td>
                                    <td className="py-4 px-4">
                                        <span className={flight.statusColor}>{flight.status}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <a href="#" className="text-blue-400 hover:text-blue-300">Detalles</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardPart;