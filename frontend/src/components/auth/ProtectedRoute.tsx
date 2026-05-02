import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onRedirect: () => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, onRedirect }) => {
  const { token, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && !token) {
      onRedirect();
    }
  }, [token, loading, onRedirect]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!token) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
