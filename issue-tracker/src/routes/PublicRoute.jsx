import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Componente para proteger rutas públicas
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;