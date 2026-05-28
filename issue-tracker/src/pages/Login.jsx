import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { showErrorAlert } from '../helpers/alerts';
import Button from '../components/Boton';

const Login = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Administrador');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      showErrorAlert('Por favor ingresa tu nombre');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    login({ name: name.trim(), role });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* Logo o título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Issue Tracker</h1>
          <p className="text-gray-500 mt-2 text-sm">Accede al panel de gestión</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Ej: Juan Pérez"
              disabled={isSubmitting}
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Rol
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              disabled={isSubmitting}
            >
              <option value="Administrador">Administrador</option>
              <option value="Soporte Técnico">Soporte Técnico</option>
              <option value="Usuario">Usuario</option>
            </select>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth={true}
            disabled={isSubmitting}
            className="mt-2"
          >
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </form>

        {/* Nota informativa */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Demo: ingresa cualquier nombre y selecciona un rol
        </p>
      </div>
    </div>
  );
};

export default Login;