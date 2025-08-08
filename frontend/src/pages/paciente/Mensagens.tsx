
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function Mensagens() {
  // Dados de exemplo
  const mensagens = [
    { id: 1, remetente: 'Dr. Carlos', mensagem: 'Olá, Camila! Como está se adaptando ao novo plano?', data: '2023-05-09T10:30:00', nutricionista: true },
    { id: 2, remetente: 'Você', mensagem: 'Olá, doutor! Estou gostando bastante, mas tenho uma dúvida sobre o lanche da tarde.', data: '2023-05-09T10:35:00', nutricionista: false },
    { id: 3, remetente: 'Dr. Carlos', mensagem: 'Claro, qual é a sua dúvida?', data: '2023-05-09T10:40:00', nutricionista: true },
    { id: 4, remetente: 'Você', mensagem: 'Posso substituir a fruta sugerida por outra da mesma época?', data: '2023-05-09T10:45:00', nutricionista: false },
    { id: 5, remetente: 'Dr. Carlos', mensagem: 'Sim, pode substituir por frutas da mesma época sem problemas. Tente manter o mesmo valor calórico aproximado.', data: '2023-05-09T10:50:00', nutricionista: true },
  ];

  return (
    <DashboardLayout userType="paciente">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Mensagens</h1>
        
        <Card className="flex flex-col h-[calc(100vh-12rem)]">
          <CardHeader>
            <CardTitle>Conversa com Dr. Carlos</CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {mensagens.map(mensagem => (
                <div 
                  key={mensagem.id} 
                  className={`flex gap-3 max-w-[80%] ${mensagem.nutricionista ? '' : 'ml-auto flex-row-reverse'}`}
                >
                  {mensagem.nutricionista && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                      <UserRound className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  
                  <div className={`p-3 rounded-lg ${
                    mensagem.nutricionista 
                      ? 'bg-muted text-foreground' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    <p className="text-sm">{mensagem.mensagem}</p>
                    <span className="text-xs opacity-70 block text-right mt-1">
                      {new Date(mensagem.data).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  {!mensagem.nutricionista && (
                    <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">VC</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <form className="flex gap-2">
                <Textarea 
                  placeholder="Digite sua mensagem..." 
                  className="min-h-[60px] resize-none flex-1"
                />
                <Button type="submit" className="self-end">Enviar</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
