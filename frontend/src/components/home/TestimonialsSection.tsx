
export function TestimonialsSection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="wisebites-container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            O que nossos usuários estão dizendo
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Nutricionistas e pacientes estão transformando seu relacionamento com a alimentação através do WiseBites.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <p className="text-gray-600 italic mb-4">
              "Como nutricionista, o WiseBites revolucionou minha prática. Consigo acompanhar os pacientes em tempo real e fazer ajustes nos planos alimentares quando necessário."
            </p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-wisebites-green flex items-center justify-center text-white font-medium">
                DR
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-gray-900">Dra. Regina Santos</h4>
                <p className="text-sm text-gray-600">Nutricionista Clínica</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <p className="text-gray-600 italic mb-4">
              "Finalmente encontrei um aplicativo que torna fácil registrar minhas refeições. Os lembretes são essenciais para manter a disciplina na minha dieta."
            </p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-wisebites-blue flex items-center justify-center text-white font-medium">
                CM
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-gray-900">Camila Mendes</h4>
                <p className="text-sm text-gray-600">Paciente</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <p className="text-gray-600 italic mb-4">
              "Os gráficos de progresso me motivam a seguir o plano. A comunicação direta com minha nutricionista faz toda a diferença para esclarecer dúvidas."
            </p>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-wisebites-green flex items-center justify-center text-white font-medium">
                RL
              </div>
              <div className="ml-4">
                <h4 className="font-medium text-gray-900">Ricardo Lima</h4>
                <p className="text-sm text-gray-600">Paciente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
