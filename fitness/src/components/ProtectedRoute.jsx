import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // ✅ Adjust if needed

export default function ProtectedRoute({ children }) {
  const { auth } = useAuth();

  if (!auth.token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
