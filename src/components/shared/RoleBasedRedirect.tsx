import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function RoleBasedRedirect() {
  const { profile } = useAuth();

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  if (profile.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/frontend" replace />;
}
