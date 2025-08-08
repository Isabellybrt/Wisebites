import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const useAuthRedirect = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      const userDashboard = user.tipo_usuario === 'nutricionista' ? '/nutricionista' : '/paciente';
      navigate(userDashboard, { replace: true });
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  return { user, isAuthenticated, isLoading };
};
