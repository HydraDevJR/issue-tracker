import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

export const getIncidencias = () => axios.get(API_BASE);
export const createIncidencia = (data) => axios.post(API_BASE, data);
export const updateIncidencia = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteIncidencia = (id) => axios.delete(`${API_BASE}/${id}`);