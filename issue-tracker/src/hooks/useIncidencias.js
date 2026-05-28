import { useState, useCallback } from 'react';
import { getIncidencias, createIncidencia, updateIncidencia, deleteIncidencia } from '../services/api';

export const useIncidencias = () => {
    const [incidencias, setIncidencias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Obtener todas las incidencias
    const fetchIncidencias = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await getIncidencias();
            setIncidencias(data);
        } catch (err) {
            setError(err);
            throw err; // Propaga el error para manejarlo en el componente
        } finally {
            setLoading(false);
        }
    }, []);

    // Crear una nueva incidencia
    const addIncidencia = useCallback(async (incidenciaData) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await createIncidencia(incidenciaData);
            setIncidencias(prev => [...prev, data]);
            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Actualizar una incidencia existente
    const editIncidencia = useCallback(async (id, updatedData) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await updateIncidencia(id, updatedData);
            setIncidencias(prev => prev.map(inc => (inc.id === id ? data : inc)));
            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Eliminar una incidencia
    const removeIncidencia = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deleteIncidencia(id);
            setIncidencias(prev => prev.filter(inc => inc.id !== id));
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        incidencias,
        loading,
        error,
        fetchIncidencias,
        addIncidencia,
        editIncidencia,
        removeIncidencia,
    };
};