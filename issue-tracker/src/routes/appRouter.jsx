import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import RootRedirect from './RootRedirect';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

// Componente principal del Router
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: login */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        {/* Ruta privada: dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        
        {/* Ruta raíz: usa el componente RootRedirect */}
        <Route path="/" element={<RootRedirect />} />
        
        {/* Ruta 404 - Opcional: redirige a raíz */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};