
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || (location.pathname === '/' && path.startsWith('/#'));
  };

  // Determinar se estamos na página inicial
  const isHomePage = location.pathname === '/';

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Características', href: '/#features' },
    { name: 'Sobre', href: '/#about' },
    { name: 'Contato', href: '/#contact' },
  ];

  // Função para lidar com scroll para âncoras na página inicial
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomePage && href.startsWith('/#')) {
      e.preventDefault();
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="wisebites-container">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Abrir menu principal</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link to="/" className="flex items-center space-x-2">
                <span className="h-8 w-8 bg-wisebites-green rounded-full flex items-center justify-center">
                  <span className="font-bold text-white">WB</span>
                </span>
                <span className="text-xl font-semibold text-wisebites-blue">WiseBites</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className={cn(
                      isActive(item.href)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-2">
            <Link to="/login">
              <Button variant="outline" className="hidden sm:inline-flex">Entrar</Button>
            </Link>
            <Link to="/register">
              <Button className="hidden sm:inline-flex">Registrar</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={cn('sm:hidden', mobileMenuOpen ? 'block' : 'hidden')}>
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={(e) => handleAnchorClick(e, item.href)}
              className={cn(
                isActive(item.href)
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 flex flex-col space-y-2 px-3">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">Entrar</Button>
            </Link>
            <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">Registrar</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
