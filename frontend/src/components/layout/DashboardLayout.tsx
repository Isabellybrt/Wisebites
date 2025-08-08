
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Users, 
  FileText, 
  Settings, 
  Calendar, 
  BarChart, 
  MessageSquare,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, href, active, onClick }: SidebarItemProps) => {
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Previne o comportamento padrão
    onClick?.(); // Executa o callback opcional (fechar menu mobile)
    navigate(href); // Navega programaticamente
  };
  
  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
        active ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-100"
      )}
    >
      <Icon size={20} />
      <span>{label}</span>
    </a>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'nutricionista' | 'paciente';
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const nutricionistaSidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/nutricionista' },
    { icon: Users, label: 'Pacientes', href: '/nutricionista/pacientes' },
    { icon: FileText, label: 'Planos Alimentares', href: '/nutricionista/planos' },
    { icon: MessageSquare, label: 'Mensagens', href: '/nutricionista/mensagens' },
    { icon: Settings, label: 'Configurações', href: '/nutricionista/configuracoes' },
  ];

  const pacienteSidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/paciente' },
    { icon: FileText, label: 'Meu Plano', href: '/paciente/plano' },
    { icon: Calendar, label: 'Registrar Refeição', href: '/paciente/registrar' },
    { icon: MessageSquare, label: 'Mensagens', href: '/paciente/mensagens' },
    { icon: Settings, label: 'Configurações', href: '/paciente/configuracoes' },
  ];

  const sidebarItems = userType === 'nutricionista' ? nutricionistaSidebarItems : pacienteSidebarItems;

  // Função para fechar o sidebar ao navegar (versão mobile)
  const handleNavigation = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600/75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="h-8 w-8 bg-wisebites-green rounded-full flex items-center justify-center">
              <span className="font-bold text-white">WB</span>
            </span>
            <span className="text-xl font-semibold text-wisebites-blue">WiseBites</span>
          </Link>
          <button 
            className="block lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
          <nav className="space-y-1 px-3 py-4">
            {sidebarItems.map((item, index) => (
              <SidebarItem 
                key={index}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={isActive(item.href)}
                onClick={handleNavigation}
              />
            ))}
          </nav>
          <div className="border-t border-gray-200 p-3">
            {/* Informações do usuário */}
            {user && (
              <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-wisebites-green rounded-full flex items-center justify-center">
                    <span className="font-bold text-white text-sm">
                      {user.nome.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.nome}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.tipo_usuario}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <button 
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navbar for mobile */}
        <header className="bg-white border-b border-gray-200 lg:hidden">
          <div className="flex h-16 items-center justify-between px-4">
            <button 
              className="text-gray-600"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <span className="h-8 w-8 bg-wisebites-green rounded-full flex items-center justify-center">
                <span className="font-bold text-white">WB</span>
              </span>
              <span className="text-xl font-semibold text-wisebites-blue">WiseBites</span>
            </div>
            <div className="w-6" /> {/* Empty div for flex alignment */}
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
