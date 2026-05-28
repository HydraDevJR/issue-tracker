import { useEffect, useState } from 'react';
import { useIncidencias } from '../hooks/useIncidencias';
import { showSuccessAlert, showHttpErrorAlert, showConfirmAlert } from '../helpers/alerts';
import IncidenciaCard from '../components/dashboard/IncidenciaCard';
import ModalForm from '../components/dashboard/ModalForm';
import Button from '../components/Boton';

const Dashboard = () => {
    const { incidencias, loading, fetchIncidencias, addIncidencia, editIncidencia, removeIncidencia } = useIncidencias();
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [filterPrioridad, setFilterPrioridad] = useState('Todas');

    useEffect(() => {
        fetchIncidencias().catch(err => showHttpErrorAlert(err, 'No se pudieron cargar las incidencias'));
    }, [fetchIncidencias]);

    const incidenciasFiltradas = filterPrioridad === 'Todas'
        ? incidencias
        : incidencias.filter(inc => inc.prioridad === filterPrioridad);

    const handleDelete = async (id) => {
        const confirmed = await showConfirmAlert('¿Eliminar esta incidencia permanentemente?');
        if (!confirmed) return;
        try {
            await removeIncidencia(id);
            showSuccessAlert('Incidencia eliminada');
        } catch (err) {
            showHttpErrorAlert(err, 'Error al eliminar');
        }
    };

    const handleSubmit = async (data) => {
        try {
            if (editing) {
                await editIncidencia(editing.id, data);
                showSuccessAlert('Incidencia actualizada');
            } else {
                await addIncidencia(data);
                showSuccessAlert('Incidencia creada');
            }
            setModalOpen(false);
            setEditing(null);
        } catch (err) {
            showHttpErrorAlert(err, 'Error al guardar');
        }
    };

    return (
        <div>
            {/* Header con título, filtro y botón nueva incidencia */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Incidencias</h2>
                <div className="flex gap-3">
                    <select
                        value={filterPrioridad}
                        onChange={(e) => setFilterPrioridad(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                        <option value="Todas">Todas las prioridades</option>
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>
                    <Button
                        onClick={() => {
                            setEditing(null);
                            setModalOpen(true);
                        }}
                        variant="primary"
                        size="md"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        }
                    >
                        Nueva incidencia
                    </Button>
                </div>
            </div>

            {/* Estado de carga */}
            {loading && (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600">Cargando incidencias...</span>
                </div>
            )}

            {/* Listado de incidencias */}
            {!loading && incidenciasFiltradas.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                        {filterPrioridad !== 'Todas'
                            ? `No hay incidencias con prioridad "${filterPrioridad}"`
                            : 'No hay incidencias'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {filterPrioridad !== 'Todas'
                            ? 'Prueba con otro filtro o crea una nueva incidencia.'
                            : 'Comienza creando una nueva incidencia.'}
                    </p>
                    <div className="mt-6">
                        <Button
                            onClick={() => {
                                setEditing(null);
                                setModalOpen(true);
                            }}
                            variant="primary"
                            size="sm"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            }
                        >
                            Nueva incidencia
                        </Button>
                    </div>
                </div>
            )}

            {/* Grid de tarjetas */}
            {!loading && incidenciasFiltradas.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {incidenciasFiltradas.map(inc => (
                        <IncidenciaCard
                            key={inc.id}
                            incidencia={inc}
                            onEdit={() => {
                                setEditing(inc);
                                setModalOpen(true);
                            }}
                            onDelete={() => handleDelete(inc.id)}
                        />
                    ))}
                </div>
            )}

            {/* Modal de creación/edición */}
            <ModalForm
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setEditing(null);
                }}
                initialData={editing}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default Dashboard;