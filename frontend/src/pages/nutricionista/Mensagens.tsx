
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRound } from 'lucide-react';

export default function Mensagens() {
  // Dados de exemplo
  const mensagens = [
    { id: 1, paciente: 'Camila Mendes', mensagem: 'Olá, tenho dúvidas sobre o lanche da tarde.', data: '2023-05-10T14:30:00', lida: false },
    { id: 2, paciente: 'Ricardo Lima', mensagem: 'Preciso reagendar minha consulta de amanhã.', data: '2023-05-09T10:15:00', lida: true },
    { id: 3, paciente: 'Marina Souza', mensagem: 'O novo plano está funcionando muito bem!', data: '2023-05-08T16:45:00', lida: true },
    { id: 4, paciente: 'João Silva', mensagem: 'Enviei os registros da semana passada.', data: '2023-05-07T09:20:00', lida: true },
  ];

  return (
    <DashboardLayout userType="nutricionista">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Mensagens</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Caixa de Entrada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mensagens.map(mensagem => (
                <div 
                  key={mensagem.id} 
                  className={`flex gap-4 p-4 rounded-lg ${mensagem.lida ? '' : 'bg-primary/5 font-medium'}`}
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserRound className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{mensagem.paciente}</h3>
                      <span className="text-xs text-muted-foreground">
                        {new Date(mensagem.data).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{mensagem.mensagem}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
