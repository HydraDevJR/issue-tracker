import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Componente para la redirección de la raíz
const RootRedirect = () => {
  const { user } = useAuth();
  return <Navigate to={user ? "/dashboard" : "/login"} replace />;
};

export default RootRedirect;