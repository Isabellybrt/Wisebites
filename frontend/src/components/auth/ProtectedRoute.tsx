import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loading } from '@/components/ui/loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: 'cliente' | 'nutricionista' | 'paciente';
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredUserType,
  redirectTo = '/login',
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Verificando autenticação..." />
      </div>
    );
  }

  // Se não está autenticado, redirecionar para login
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Se requer um tipo específico de usuário e o usuário não tem esse tipo
  if (requiredUserType && user?.tipo_usuario !== requiredUserType) {
    // Redirecionar para a dashboard apropriada baseada no tipo do usuário
    const userDashboard = user?.tipo_usuario === 'nutricionista' ? '/nutricionista' : '/paciente';
    return <Navigate to={userDashboard} replace />;
  }
  return <>{children}</>;
};
