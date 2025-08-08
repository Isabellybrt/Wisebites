
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <div id="contact" className="bg-wisebites-blue">
      <div className="wisebites-container py-16 sm:py-24">
        <div className="relative rounded-2xl overflow-hidden bg-wisebites-dark/10 py-10 px-6 sm:px-12 lg:p-20">
          <div className="absolute -top-20 -right-20">
            <svg
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
              className="text-white/10"
            >
              <defs>
                <pattern
                  id="de3a5fbb-1d31-45b0-b7aa-8cc0cb9bb6c8"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="384"
                fill="url(#de3a5fbb-1d31-45b0-b7aa-8cc0cb9bb6c8)"
              />
            </svg>
          </div>
          
          <div className="relative lg:grid lg:grid-cols-2 lg:gap-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Pronto para transformar sua experiência nutricional?
              </h2>
              <p className="mt-6 text-lg text-wisebites-blue-100 text-white/80 max-w-xl">
                Junte-se a milhares de nutricionistas e pacientes que já estão melhorando seus resultados
                com o WiseBites. Registre-se hoje e comece a jornada para uma vida mais saudável.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 flex items-center justify-center lg:justify-end">
              <div className="space-y-4">
                <Button size="lg" className="w-full bg-white text-wisebites-blue hover:bg-gray-100 hover:text-wisebites-blue">
                  <Link to="/register">Registrar como Nutricionista</Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full border-white text-white hover:bg-white/10">
                  <Link to="/register">Registrar como Paciente</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
