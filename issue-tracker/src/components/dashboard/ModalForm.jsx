import { useState, useEffect } from 'react';
import { ESTADOS_LISTA, PRIORIDADES_LISTA } from '../../constants/incidenciaConstants';
import Button from '../Boton';

const ModalForm = ({ open, onClose, initialData, onSubmit }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        estado: 'Pendiente',
        prioridad: 'Media'
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                titulo: initialData.titulo || '',
                descripcion: initialData.descripcion || '',
                estado: initialData.estado || 'Pendiente',
                prioridad: initialData.prioridad || 'Media'
            });
        } else {
            setFormData({
                titulo: '',
                descripcion: '',
                estado: 'Pendiente',
                prioridad: 'Media'
            });
        }
        setErrors({});
    }, [initialData, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.titulo.trim()) newErrors.titulo = 'El título es obligatorio';
        if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es obligatoria';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        onSubmit(formData);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-40 transition-opacity backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal panel centrado */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all">
                    {/* Header con título y botón cerrar */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {initialData ? 'Editar incidencia' : 'Nueva incidencia'}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                            aria-label="Cerrar"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit}>
                        <div className="px-6 py-5 space-y-5">
                            {/* Campo título */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Título *
                                </label>
                                <input
                                    type="text"
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.titulo ? 'border-red-400' : 'border-gray-300'
                                        }`}
                                />
                                {errors.titulo && (
                                    <p className="mt-1 text-xs text-red-500">{errors.titulo}</p>
                                )}
                            </div>

                            {/* Campo descripción */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Descripción *
                                </label>
                                <textarea
                                    name="descripcion"
                                    rows="3"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.descripcion ? 'border-red-400' : 'border-gray-300'
                                        }`}
                                />
                                {errors.descripcion && (
                                    <p className="mt-1 text-xs text-red-500">{errors.descripcion}</p>
                                )}
                            </div>

                            {/* Estado */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Estado
                                </label>
                                <select
                                    name="estado"
                                    value={formData.estado}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {ESTADOS_LISTA.map(estado => (
                                        <option key={estado} value={estado}>{estado}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Prioridad */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Prioridad
                                </label>
                                <select
                                    name="prioridad"
                                    value={formData.prioridad}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {PRIORIDADES_LISTA.map(prioridad => (
                                        <option key={prioridad} value={prioridad}>{prioridad}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Footer con botones */}
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                            <Button
                                type="button"
                                onClick={onClose}
                                variant="secondary"
                                size="md"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                size="md"
                            >
                                {initialData ? 'Actualizar' : 'Crear'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalForm;