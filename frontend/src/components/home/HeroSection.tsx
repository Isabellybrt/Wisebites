
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="wisebites-container pt-16 pb-16 sm:pb-24 lg:pt-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-base font-semibold text-wisebites-green">
                Apresentando o WiseBites
              </span>
              <span className="mt-1 block text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                <span className="block text-gray-900">Transforme sua</span>
                <span className="block text-wisebites-blue">experiência nutricional</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl">
              Um sistema completo para nutricionistas e pacientes gerenciarem dietas, registrarem refeições
              e acompanharem o progresso através de uma plataforma integrada e intuitiva.
            </p>
            <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto text-base">
                    Começar gratuitamente
                  </Button>
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
                    Faça login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full overflow-hidden rounded-lg bg-white">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80"
                  alt="Exemplo de refeição saudável"
                  className="w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-wisebites-blue/80 text-white">
                    {/* Play button icon */}
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 000-1.69L9.54 5.98A.998.998 0 008 6.82z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
