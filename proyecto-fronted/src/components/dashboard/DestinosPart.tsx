import React, { useEffect, useState, useMemo } from "react";
import {
    MapPin,
    Plus,
    X,
    Trash2,
    Edit,
    AlertTriangle
} from "lucide-react";
import {
    obtenerDestinos,
    crearDestino,
    actualizarDestino,
    eliminarDestino,
} from "../../api/DestinosApi";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { ThemeProvider, createTheme } from '@mui/material';

interface Destino {
    idDestino: number;
    ciudad: string;
    imagen: string;
    descripcion: string;
    precio: number;
    disponible: boolean;
}

const DestinoList: React.FC = () => {
    const [destinos, setDestinos] = useState<Destino[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [modoEdicion, setModoEdicion] = useState<boolean>(false);
    const [destinoEditando, setDestinoEditando] = useState<number | null>(null);

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [destinoAEliminar, setDestinoAEliminar] = useState<Destino | null>(null);

    const [form, setForm] = useState({
        ciudad: "",
        imagen: "",
        descripcion: "",
        precio: "",
        disponible: true,
    });

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
        cargarDestinos();
    }, []);

    const cargarDestinos = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await obtenerDestinos();

            if (Array.isArray(res.data)) {
                setDestinos(res.data);
            } else {
                setError("La respuesta no es un array válido");
                setDestinos([]);
            }
        } catch (err: any) {
            console.error("Error al cargar destinos:", err);
            setError(err.response?.data?.message || "Error al cargar destinos");
            setDestinos([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEliminar = (destino: Destino) => {
        setDestinoAEliminar(destino);
        setShowDeleteModal(true);
    };

    const confirmarEliminacion = async () => {
        if (destinoAEliminar) {
            try {
                await eliminarDestino(destinoAEliminar.idDestino);
                toast.success("Destino eliminado exitosamente");
                setShowDeleteModal(false);
                setDestinoAEliminar(null);
                cargarDestinos();
            } catch (err: any) {
                toast.error(
                    "Error al eliminar: " + (err.response?.data?.message || err.message)
                );
            }
        }
    };

    const handleEditar = (destino: Destino) => {
        setModoEdicion(true);
        setDestinoEditando(destino.idDestino);
        setForm({
            ciudad: destino.ciudad,
            imagen: destino.imagen,
            descripcion: destino.descripcion,
            precio: destino.precio.toString(),
            disponible: destino.disponible,
        });
        setShowModal(true);
    };

    const handleNuevoDestino = () => {
        setModoEdicion(false);
        setDestinoEditando(null);
        setForm({
            ciudad: "",
            imagen: "",
            descripcion: "",
            precio: "",
            disponible: true,
        });
        setShowModal(true);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const destinoData = {
                ciudad: form.ciudad,
                imagen: form.imagen,
                descripcion: form.descripcion,
                precio: parseFloat(form.precio),
                disponible: form.disponible,
            };

            if (modoEdicion && destinoEditando) {
                await actualizarDestino(destinoEditando, destinoData);
                toast.success("Destino actualizado correctamente");
            } else {
                await crearDestino(destinoData);
                toast.success("Destino registrado correctamente");
            }

            setForm({
                ciudad: "",
                imagen: "",
                descripcion: "",
                precio: "",
                disponible: true,
            });
            setShowModal(false);
            setModoEdicion(false);
            setDestinoEditando(null);
            cargarDestinos();
        } catch (error: any) {
            toast.error(
                `Error al ${modoEdicion ? 'actualizar' : 'registrar'} destino: ` +
                (error.response?.data?.message || error.message)
            );
        }
    };

    const columns = useMemo<MRT_ColumnDef<Destino>[]>(
        () => [
            {
                accessorKey: 'idDestino',
                header: 'ID',
                size: 80,
                Cell: ({ cell }) => (
                    <span className="text-blue-400 font-semibold">
                        #{cell.getValue<number>()}
                    </span>
                ),
            },
            {
                accessorKey: 'imagen',
                header: 'Imagen',
                size: 120,
                Cell: ({ cell }) => (
                    <img
                        src={cell.getValue<string>()}
                        alt="destino"
                        className="w-20 h-14 rounded-lg object-cover border border-slate-600"
                    />
                ),
            },
            {
                accessorKey: 'ciudad',
                header: 'Ciudad',
                size: 150,
                Cell: ({ cell }) => (
                    <span className="font-semibold">
                        {cell.getValue<string>()}
                    </span>
                ),
            },
            {
                accessorKey: 'descripcion',
                header: 'Descripción',
                size: 250,
                Cell: ({ cell }) => (
                    <span className="text-slate-300 text-sm line-clamp-2">
                        {cell.getValue<string>()}
                    </span>
                ),
            },
            {
                accessorKey: 'precio',
                header: 'Precio',
                size: 120,
                Cell: ({ cell }) => (
                    <span className="text-green-400 font-semibold">
                        S/. {cell.getValue<number>().toFixed(2)}
                    </span>
                ),
            },
            {
                accessorKey: 'disponible',
                header: 'Disponible',
                size: 130,
                Cell: ({ cell }) => {
                    const disponible = cell.getValue<boolean>();
                    return (
                        <span className={`${disponible ? 'bg-green-500' : 'bg-red-500'} text-white text-xs px-3 py-1 rounded-full`}>
                            {disponible ? 'Sí' : 'No'}
                        </span>
                    );
                },
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: destinos,
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

    const totalDestinos = destinos.length;
    const destinosDisponibles = destinos.filter((d) => d.disponible).length;
    const destinosNoDisponibles = destinos.filter((d) => !d.disponible).length;
    const precioPromedio = destinos.length > 0 
        ? destinos.reduce((sum, d) => sum + d.precio, 0) / destinos.length 
        : 0;

    if (loading) {
        return (
            <div className="p-8">
                <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-slate-400">Cargando destinos...</p>
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
                            <p className="font-bold text-red-400 mb-2">Error al cargar los destinos</p>
                            <p className="text-red-300 mb-4">{error}</p>
                            <button
                                onClick={cargarDestinos}
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
                            <MapPin className="w-8 h-8 text-blue-400" />
                            Gestión de Destinos
                        </h2>
                        <p className="text-slate-400">
                            Administra todos los destinos turísticos disponibles
                        </p>
                    </div>
                    <button
                        onClick={handleNuevoDestino}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-6 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Nuevo Destino</span>
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <p className="text-slate-400 text-xs mb-1">Total Destinos</p>
                        <p className="text-2xl font-bold">{totalDestinos}</p>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <p className="text-slate-400 text-xs mb-1">Disponibles</p>
                        <p className="text-2xl font-bold text-green-400">{destinosDisponibles}</p>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <p className="text-slate-400 text-xs mb-1">No Disponibles</p>
                        <p className="text-2xl font-bold text-red-400">{destinosNoDisponibles}</p>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                        <p className="text-slate-400 text-xs mb-1">Precio Promedio</p>
                        <p className="text-2xl font-bold text-blue-400">S/. {precioPromedio.toFixed(2)}</p>
                    </div>
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                    <MaterialReactTable table={table} />
                </div>

                {showModal && (
                    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => {
                            setShowModal(false);
                            setModoEdicion(false);
                            setDestinoEditando(null);
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
                                    <div className="flex items-center justify-between p-6 border-b border-slate-700">
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                            <MapPin className="w-6 h-6 text-blue-400" />
                                            {modoEdicion ? 'Editar Destino' : 'Registrar Nuevo Destino'}
                                        </h2>
                                        <button
                                            onClick={() => {
                                                setShowModal(false);
                                                setModoEdicion(false);
                                                setDestinoEditando(null);
                                            }}
                                            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="p-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Ciudad
                                                </label>
                                                <input
                                                    type="text"
                                                    name="ciudad"
                                                    placeholder="Ej: Machu Picchu"
                                                    value={form.ciudad}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Imagen (URL)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="imagen"
                                                    placeholder="https://ejemplo.com/imagen.jpg"
                                                    value={form.imagen}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                                />
                                            </div>

                                            <div className="col-span-2">
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Descripción
                                                </label>
                                                <textarea
                                                    name="descripcion"
                                                    placeholder="Describe el destino turístico..."
                                                    value={form.descripcion}
                                                    onChange={handleChange}
                                                    required
                                                    rows={4}
                                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 resize-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Precio (S/.)
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
                                                    Disponibilidad
                                                </label>
                                                <select
                                                    name="disponible"
                                                    value={form.disponible ? "1" : "0"}
                                                    onChange={(e) => setForm({ ...form, disponible: e.target.value === "1" })}
                                                    required
                                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                                >
                                                    <option value="1">Disponible</option>
                                                    <option value="0">No Disponible</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mt-6">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setShowModal(false);
                                                    setModoEdicion(false);
                                                    setDestinoEditando(null);
                                                }}
                                                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition-colors font-semibold cursor-pointer"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                onClick={handleSubmit}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-semibold cursor-pointer"
                                            >
                                                {modoEdicion ? 'Actualizar Destino' : 'Guardar Destino'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}

                {showDeleteModal && (
                    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => {
                            setShowDeleteModal(false);
                            setDestinoAEliminar(null);
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
                                    <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-red-900/20">
                                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                            <AlertTriangle className="w-6 h-6 text-red-500" />
                                            Confirmar Eliminación
                                        </h2>
                                        <button
                                            onClick={() => {
                                                setShowDeleteModal(false);
                                                setDestinoAEliminar(null);
                                            }}
                                            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="p-6">
                                        <p className="text-slate-300 mb-2">
                                            ¿Estás seguro de que deseas eliminar este destino?
                                        </p>
                                        {destinoAEliminar && (
                                            <div className="bg-slate-700 rounded-lg p-4 my-4">
                                                <p className="text-white font-semibold text-lg mb-2">
                                                    {destinoAEliminar.ciudad}
                                                </p>
                                                <p className="text-slate-400 text-sm mb-2">
                                                    {destinoAEliminar.descripcion}
                                                </p>
                                                <p className="text-green-400 text-sm font-semibold">
                                                    S/. {destinoAEliminar.precio.toFixed(2)}
                                                </p>
                                            </div>
                                        )}
                                        <p className="text-red-400 text-sm">
                                            ⚠️ Esta acción no se puede deshacer
                                        </p>
                                    </div>

                                    <div className="flex gap-3 p-6 border-t border-slate-700">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowDeleteModal(false);
                                                setDestinoAEliminar(null);
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

export default DestinoList;