import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Boton';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo / Título */}
                        <div className="flex items-center">
                            <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
                                Issue Tracker
                            </h1>
                        </div>

                        {/* Info usuario + logout */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium text-sm">
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className="text-sm text-gray-700 hidden sm:inline-block">
                                    {user?.name} <span className="text-gray-400">({user?.role})</span>
                                </span>
                            </div>
                            <Button
                                onClick={handleLogout}
                                variant="danger"
                                size="sm"
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                }
                            >
                                <span className="hidden sm:inline">Cerrar sesión</span>
                                <span className="sm:hidden">Salir</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;