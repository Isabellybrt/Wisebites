
import { 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  ClipboardList, 
  Clock, 
  MessageSquare 
} from 'lucide-react';

const features = [
  {
    name: 'Planos Alimentares Personalizados',
    description: 'Nutricionistas podem criar planos alimentares detalhados e personalizados para cada paciente.',
    icon: ClipboardList,
  },
  {
    name: 'Registro de Refeições',
    description: 'Pacientes podem registrar facilmente suas refeições diárias através da plataforma.',
    icon: Calendar,
  },
  {
    name: 'Comparação Automática',
    description: 'O sistema compara automaticamente as refeições consumidas com o plano alimentar estabelecido.',
    icon: CheckCircle2,
  },
  {
    name: 'Análises e Gráficos',
    description: 'Visualize o progresso e a adesão à dieta através de gráficos e relatórios detalhados.',
    icon: BarChart3,
  },
  {
    name: 'Lembretes e Notificações',
    description: 'Receba lembretes sobre horários de refeições e atualizações importantes.',
    icon: Clock,
  },
  {
    name: 'Comunicação Integrada',
    description: 'Troque mensagens diretamente entre nutricionista e paciente dentro da plataforma.',
    icon: MessageSquare,
  },
];

export function FeaturesSection() {
  return (
    <div id="features" className="bg-gray-50 py-16 sm:py-24">
      <div className="wisebites-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tudo o que você precisa para um acompanhamento nutricional completo
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Nossa plataforma oferece ferramentas poderosas para nutricionistas e pacientes,
            facilitando o acompanhamento e a adesão a dietas personalizadas.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="pt-6">
              <div className="flow-root rounded-lg bg-white px-6 pb-8 shadow-sm">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center rounded-md bg-wisebites-blue p-3 shadow-lg">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
