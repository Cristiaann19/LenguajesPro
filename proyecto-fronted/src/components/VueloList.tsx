import React, { useEffect, useState, useMemo } from "react";
import {
    Plane,
    Plus,
    X,
    Trash2,
    Edit,
    CheckCircle,
    AlertTriangle
} from "lucide-react";
import { listarVuelos, eliminarVuelo, registrarVuelo, actualizarVuelo, cambiarEstadoVuelo } from "../api/vueloApi";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable,} from 'material-react-table';
import { ThemeProvider, createTheme, Menu, MenuItem } from '@mui/material';

interface Vuelo {
    idVuelo: number;
    codigoVuelo: string;
    origen: string;
    destino: string;
    fechaSalida: string;
    horaSalida: string;
    precio: number;
    estado: string;
}

const VueloList: React.FC = () => {
    const [vuelos, setVuelos] = useState<Vuelo[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    // para editar
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modoEdicion, setModoEdicion] = useState<boolean>(false);
    const [vueloEditando, setVueloEditando] = useState<number | null>(null);

    // Menu para cambiar estado
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [vueloEstadoSeleccionado, setVueloEstadoSeleccionado] = useState<number | null>(null);
    
    // para eliminar
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [vueloAEliminar, setVueloAEliminar] = useState<Vuelo | null>(null);

    // Estado del formulario
    const [form, setForm] = useState({
        codigoVuelo: "",
        origen: "",
        destino: "",
        fechaSalida: "",
        horaSalida: "",
        precio: "",
        estado: "Activo",
    });

    // Tema oscuro para Material UI
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#3b82f6',
            },
            background: {
                default: '#0f172a',
                paper: '#1e293b',
            },
            text: {
                primary: '#ffffff',
                secondary: '#94a3b8',
            },
        },
        components: {
            MuiPopover: {
                styleOverrides: {
                    paper: {
                        backgroundColor: '#1e293b',
                        color: '#ffffff',
                    },
                },
            },
            MuiMenu: {
                styleOverrides: {
                    paper: {
                        backgroundColor: '#1e293b',
                        color: '#ffffff',
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        '&:hover': {
                            backgroundColor: '#334155',
                        },
                    },
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    root: {
                        '& .MuiSwitch-track': {
                            backgroundColor: '#475569',
                        },
                    },
                },
            },
        },
    });

    useEffect(() => {
        cargarVuelos();
    }, []);

    const cargarVuelos = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await listarVuelos();

            if (Array.isArray(res.data)) {
                setVuelos(res.data);
            } else {
                setError("La respuesta no es un array válido");
                setVuelos([]);
            }
        } catch (err: any) {
            console.error("Error al cargar vuelos:", err);
            setError(err.response?.data?.message || "Error al cargar vuelos");
            setVuelos([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEliminar = (vuelo: Vuelo) => {
        setVueloAEliminar(vuelo);
        setShowDeleteModal(true);
    };

    const confirmarEliminacion = async () => {
    if (vueloAEliminar) {
        try {
            await eliminarVuelo(vueloAEliminar.idVuelo);
            toast.success("Vuelo eliminado exitosamente");
            setShowDeleteModal(false);
            setVueloAEliminar(null);
            cargarVuelos();
        } catch (err: any) {
            toast.error(
                "Error al eliminar: " + (err.response?.data?.message || err.message)
            );
        }
    }
};

    const handleEditar = (vuelo: Vuelo) => {
        setModoEdicion(true);
        setVueloEditando(vuelo.idVuelo);
        setForm({
            codigoVuelo: vuelo.codigoVuelo,
            origen: vuelo.origen,
            destino: vuelo.destino,
            fechaSalida: vuelo.fechaSalida,
            horaSalida: vuelo.horaSalida,
            precio: vuelo.precio.toString(),
            estado: vuelo.estado,
        });
        setShowModal(true);
    };

    const handleNuevoVuelo = () => {
        setModoEdicion(false);
        setVueloEditando(null);
        setForm({
            codigoVuelo: "",
            origen: "",
            destino: "",
            fechaSalida: "",
            horaSalida: "",
            precio: "",
            estado: "Activo",
        });
        setShowModal(true);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const vueloData = {
                ...form,
                precio: parseFloat(form.precio),
            };

            if (modoEdicion && vueloEditando) {
                // Actualizar vuelo existente
                await actualizarVuelo(vueloEditando, vueloData);
                toast.success("Vuelo actualizado correctamente");
            } else {
                // Crear nuevo vuelo
                await registrarVuelo(vueloData);
                toast.success("Vuelo registrado correctamente");
            }

            setForm({
                codigoVuelo: "",
                origen: "",
                destino: "",
                fechaSalida: "",
                horaSalida: "",
                precio: "",
                estado: "Activo",
            });
            setShowModal(false);
            setModoEdicion(false);
            setVueloEditando(null);
            cargarVuelos();
        } catch (error: any) {
            toast.error(
                `Error al ${modoEdicion ? 'actualizar' : 'registrar'} vuelo: ` +
                (error.response?.data?.message || error.message)
            );
        }
    };

    // Manejadores para el menú de cambio de estado
    const handleOpenEstadoMenu = (event: React.MouseEvent<HTMLElement>, idVuelo: number) => {
        setAnchorEl(event.currentTarget);
        setVueloEstadoSeleccionado(idVuelo);
    };

    const handleCloseEstadoMenu = () => {
        setAnchorEl(null);
        setVueloEstadoSeleccionado(null);
    };

    const handleCambiarEstado = async (nuevoEstado: string) => {
        if (vueloEstadoSeleccionado) {
            try {
                await cambiarEstadoVuelo(vueloEstadoSeleccionado, nuevoEstado);
                toast.success(`Estado cambiado a: ${nuevoEstado}`);
                cargarVuelos();
                handleCloseEstadoMenu();
            } catch (error: any) {
                toast.error(
                    "Error al cambiar estado: " + (error.response?.data?.message || error.message)
                );
            }
        }
    };

    // Definir columnas para Material React Table
    const columns = useMemo<MRT_ColumnDef<Vuelo>[]>(
        () => [
            {
                accessorKey: 'codigoVuelo',
                header: 'Código',
                size: 120,
                Cell: ({ cell }) => (
                    <span className="text-blue-400 font-semibold">
                        {cell.getValue<string>()}
                    </span>
                ),
            },
            {
                accessorKey: 'origen',
                header: 'Origen',
                size: 150,
            },
            {
                accessorKey: 'destino',
                header: 'Destino',
                size: 150,
            },
            {
                accessorKey: 'fechaSalida',
                header: 'Fecha Salida',
                size: 130,
            },
            {
                accessorKey: 'horaSalida',
                header: 'Hora Salida',
                size: 120,
            },
            {
                accessorKey: 'precio',
                header: 'Precio',
                size: 120,
                Cell: ({ cell }) => (
                    <span className="text-green-400 font-semibold">
                        ${cell.getValue<number>().toFixed(2)}
                    </span>
                ),
            },
            {
                accessorKey: 'estado',
                header: 'Estado',
                size: 130,
                Cell: ({ cell }) => {
                    const estado = cell.getValue<string>();
                    const colorClass =
                        estado === "Activo" ? "bg-green-500" :
                            estado === "Cancelado" ? "bg-red-500" :
                                estado === "Completado" ? "bg-blue-500" :
                                    "bg-yellow-500";

                    return (
                        <span className={`${colorClass} text-white text-xs px-3 py-1 rounded-full`}>
                            {estado}
                        </span>
                    );
                },
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: vuelos,
        enableColumnActions: true,
        enableColumnFilters: true,
        enablePagination: true,
        enableSorting: true,
        enableBottomToolbar: true,
        enableTopToolbar: true,
        enableRowActions: true,
        positionActionsColumn: 'last',
        muiTableBodyRowProps: {
            sx: {
                backgroundColor: '#1e293b',
                '&:hover': {
                    backgroundColor: 'rgba(51, 65, 85, 0.5)',
                },
            },
        },
        muiTableProps: {
            sx: {
                backgroundColor: '#1e293b',
            },
        },
        muiTableHeadCellProps: {
            sx: {
                backgroundColor: '#334155',
                color: '#94a3b8',
                fontWeight: '600',
                fontSize: '0.875rem',
            },
        },
        muiTableBodyCellProps: {
            sx: {
                color: '#ffffff',
                borderColor: '#334155',
            },
        },
        muiTopToolbarProps: {
            sx: {
                backgroundColor: '#1e293b',
                borderBottom: '1px solid #334155',
            },
        },
        muiBottomToolbarProps: {
            sx: {
                backgroundColor: '#1e293b',
                borderTop: '1px solid #334155',
            },
        },
        muiPaginationProps: {
            sx: {
                color: '#94a3b8',
            },
        },
        muiTableContainerProps: {
            sx: {
                backgroundColor: '#1e293b',
            },
        },
        muiColumnActionsButtonProps: {
            sx: {
                color: '#94a3b8',
            },
        },
        muiTablePaperProps: {
            sx: {
                backgroundColor: '#1e293b',
                boxShadow: 'none',
            },
        },
        muiSearchTextFieldProps: {
            sx: {
                '& .MuiInputBase-root': {
                    color: '#ffffff',
                    backgroundColor: '#334155',
                },
                '& .MuiInputLabel-root': {
                    color: '#94a3b8',
                },
            },
        },
        muiFilterTextFieldProps: {
            sx: {
                '& .MuiInputBase-root': {
                    color: '#ffffff',
                    backgroundColor: '#334155',
                },
            },
        },
        renderRowActions: ({ row }) => (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => handleEditar(row.original)}
                    className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                    title="Editar"
                >
                    <Edit className="w-4 h-4 text-white" />
                </button>
                <button
                    onClick={(e) => handleOpenEstadoMenu(e, row.original.idVuelo)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    title="Cambiar Estado"
                >
                    <CheckCircle className="w-4 h-4 text-white" />
                </button>
                <button
                    onClick={() => handleEliminar(row.original)}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    title="Eliminar"
                >
                    <Trash2 className="w-4 h-4 text-white" />
                </button>
            </div>
        ),
        initialState: {
            pagination: {
                pageSize: 10,
                pageIndex: 0,
            },
        },
    });

    const totalVuelos = vuelos.length;
    const vuelosActivos = vuelos.filter((v) => v.estado === "Activo").length;
    const vuelosCancelados = vuelos.filter((v) => v.estado === "Cancelado").length;
    const vuelosCompletados = vuelos.filter((v) => v.estado === "Completado").length;
    const vuelosRetrasados = vuelos.filter((v) => v.estado === "Retrasado").length;

    if (loading) {
        return (
            <div className="p-8">
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-slate-400">Cargando vuelos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                        <div className="bg-red-500 rounded-full p-2">
                            <X className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-red-400 mb-2">Error al cargar los vuelos</p>
                            <p className="text-red-300 mb-4">{error}</p>
                            <button
                                onClick={cargarVuelos}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Reintentar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-1 flex items-center gap-3">
                            <Plane className="w-8 h-8 text-blue-400" />
                            Gestión de Vuelos
                        </h2>
                        <p className="text-slate-400">
                            Administra todos los vuelos programados
                        </p>
                    </div>
                    <button
                        onClick={handleNuevoVuelo}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-6 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Nuevo Vuelo</span>
                    </button>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-5 gap-4 mb-6">
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <p className="text-slate-400 text-xs mb-1">Total Vuelos</p>
                        <p className="text-2xl font-bold">{totalVuelos}</p>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <p className="text-slate-400 text-xs mb-1">Activos</p>
                        <p className="text-2xl font-bold text-green-400">{vuelosActivos}</p>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <p className="text-slate-400 text-xs mb-1">Completados</p>
                        <p className="text-2xl font-bold text-blue-400">
                            {vuelosCompletados}
                        </p>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <p className="text-slate-400 text-xs mb-1">Retrasados</p>
                        <p className="text-2xl font-bold text-yellow-400">{vuelosRetrasados}</p>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <p className="text-slate-400 text-xs mb-1">Cancelados</p>
                        <p className="text-2xl font-bold text-red-400">{vuelosCancelados}</p>
                    </div>
                </div>

                {/* Tabla con Material React Table */}
                <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                    <MaterialReactTable table={table} />
                </div>

                {/* Menu para cambiar estado */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseEstadoMenu}
                >
                    <MenuItem onClick={() => handleCambiarEstado("Activo")}>
                        <span className="text-green-400">● Activo</span>
                    </MenuItem>
                    <MenuItem onClick={() => handleCambiarEstado("Retrasado")}>
                        <span className="text-yellow-400">● Retrasado</span>
                    </MenuItem>
                    <MenuItem onClick={() => handleCambiarEstado("Completado")}>
                        <span className="text-blue-400">● Completado</span>
                    </MenuItem>
                    <MenuItem onClick={() => handleCambiarEstado("Cancelado")}>
                        <span className="text-red-400">● Cancelado</span>
                    </MenuItem>
                </Menu>

                {/* MODAL FORMULARIO */}
                {showModal && (
                    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => {
                            setShowModal(false);
                            setModoEdicion(false);
                            setVueloEditando(null)
                        }}
                    >
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Header del Modal */}
                                    <div className="flex items-center justify-between p-6 border-b border-slate-700">
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                            <Plane className="w-6 h-6 text-blue-400" />
                                            {modoEdicion ? 'Editar Vuelo' : 'Registrar Nuevo Vuelo'}
                                        </h2>
                                        <button
                                            onClick={() => {
                                                setShowModal(false);
                                                setModoEdicion(false);
                                                setVueloEditando(null);
                                            }}
                                            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    {/* Formulario */}
                                    <form onSubmit={handleSubmit} className="p-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Código de Vuelo
                                                </label>
                                                <input
                                                    type="text"
                                                    name="codigoVuelo"
                                                    placeholder="Ej: AV111"
                                                    value={form.codigoVuelo}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Origen
                                                </label>
                                                <input
                                                    type="text"
                                                    name="origen"
                                                    placeholder="Ej: Lima"
                                                    value={form.origen}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Destino
                                                </label>
                                                <input
                                                    type="text"
                                                    name="destino"
                                                    placeholder="Ej: Miami"
                                                    value={form.destino}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Fecha de Salida
                                                </label>
                                                <input
                                                    type="date"
                                                    name="fechaSalida"
                                                    value={form.fechaSalida}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Hora de Salida
                                                </label>
                                                <input
                                                    type="time"
                                                    name="horaSalida"
                                                    value={form.horaSalida}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Precio
                                                </label>
                                                <input
                                                    type="number"
                                                    name="precio"
                                                    placeholder="Ej: 500.00"
                                                    value={form.precio}
                                                    onChange={handleChange}
                                                    step="0.01"
                                                    min="0"
                                                    required
                                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Estado del Vuelo
                                                </label>
                                                <select
                                                    name="estado"
                                                    value={form.estado}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                                >
                                                    <option value="Activo">Activo</option>
                                                    <option value="Cancelado">Cancelado</option>
                                                    <option value="Retrasado">Retrasado</option>
                                                    <option value="Completado">Completado</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Botones del formulario */}
                                        <div className="flex gap-3 mt-6">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowModal(false);
                                                    setModoEdicion(false);
                                                    setVueloEditando(null);
                                                }}
                                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition-colors font-semibold cursor-pointer"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-semibold cursor-pointer"
                                            >
                                                {modoEdicion ? 'Actualizar Vuelo' : 'Guardar Vuelo'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

                {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
                {showDeleteModal && (
                    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => {
                            setShowDeleteModal(false);
                            setVueloAEliminar(null);
                        }}
                    >
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md border border-red-500"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Header del Modal */}
                                    <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-red-900/20">
                                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                            <AlertTriangle className="w-6 h-6 text-red-500" />
                                            Confirmar Eliminación
                                        </h2>
                                        <button
                                            onClick={() => {
                                                setShowDeleteModal(false);
                                                setVueloAEliminar(null);
                                            }}
                                            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    {/* Contenido */}
                                    <div className="p-6">
                                        <p className="text-slate-300 mb-2">
                                            ¿Estás seguro de que deseas eliminar el vuelo?
                                        </p>
                                        {vueloAEliminar && (
                                            <div className="bg-slate-700 rounded-lg p-4 my-4">
                                                <p className="text-white font-semibold text-lg mb-2">
                                                    {vueloAEliminar.codigoVuelo}
                                                </p>
                                                <p className="text-slate-400 text-sm">
                                                    {vueloAEliminar.origen} → {vueloAEliminar.destino}
                                                </p>
                                                <p className="text-slate-400 text-sm">
                                                    {vueloAEliminar.fechaSalida} - {vueloAEliminar.horaSalida}
                                                </p>
                                            </div>
                                        )}
                                        <p className="text-red-400 text-sm">
                                            ⚠️ Esta acción no se puede deshacer
                                        </p>
                                    </div>

                                    {/* Botones */}
                                    <div className="flex gap-3 p-6 border-t border-slate-700">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowDeleteModal(false);
                                                setVueloAEliminar(null);
                                            }}
                                            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition-colors font-semibold cursor-pointer"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={confirmarEliminacion}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 cursor-pointer"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

            </div>
        </ThemeProvider>
    );
};

export default VueloList;