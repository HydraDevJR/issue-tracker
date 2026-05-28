import { AuthProvider } from './contexts/AuthContext';
import { AppRouter } from './routes/appRouter';

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;