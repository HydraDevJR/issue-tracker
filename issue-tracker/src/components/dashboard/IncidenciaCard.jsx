import Button from '../Boton';

const IncidenciaCard = ({ incidencia, onEdit, onDelete }) => {
    // Colores según prioridad
    const prioridadColores = {
        Alta: 'bg-red-100 text-red-800 border-red-200',
        Media: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        Baja: 'bg-green-100 text-green-800 border-green-200'
    };

    // Colores según estado
    const estadoColores = {
        'Pendiente': 'bg-gray-100 text-gray-800',
        'En Progreso': 'bg-blue-100 text-blue-800',
        'Resuelto': 'bg-purple-100 text-purple-800'
    };

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <div className="p-4">
                {/* Encabezado con título y prioridad */}
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                        {incidencia.titulo}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${prioridadColores[incidencia.prioridad] || 'bg-gray-100 text-gray-800'}`}>
                        {incidencia.prioridad}
                    </span>
                </div>

                {/* Descripción */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {incidencia.descripcion}
                </p>

                {/* Estado y acciones */}
                <div className="flex justify-between items-center">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${estadoColores[incidencia.estado] || 'bg-gray-100 text-gray-800'}`}>
                        {incidencia.estado}
                    </span>
                    <div className="flex gap-2">
                        <Button
                            onClick={onEdit}
                            variant="secondary"
                            size="sm"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            }
                        >
                            Editar
                        </Button>
                        <Button
                            onClick={onDelete}
                            variant="danger"
                            size="sm"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            }
                        >
                            Eliminar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncidenciaCard;