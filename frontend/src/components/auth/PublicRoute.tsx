import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loading } from '@/components/ui/loading';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Verificando autenticação..." />
      </div>
    );
  }

  // Se está autenticado, redirecionar para a dashboard apropriada
  if (isAuthenticated && user) {
    const userDashboard = user.tipo_usuario === 'nutricionista' ? '/nutricionista' : '/paciente';
    return <Navigate to={userDashboard} replace />;
  }

  return <>{children}</>;
};
