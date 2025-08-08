
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Clock, Info, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { clienteAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';



export default function PlanoAlimentar() {
  const { toast } = useToast();
  const [planoNutricional, setPlanoNutricional] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Carregar plano nutricional do cliente
  useEffect(() => {
    const carregarPlano = async () => {
      try {
        setLoading(true);
        const response = await clienteAPI.getProfile();
        setPlanoNutricional(response.cliente?.planoNutricional);
      } catch (error) {
        console.error('Erro ao carregar plano nutricional:', error);
        toast({
          title: 'Erro',
          description: 'Erro ao carregar seu plano nutricional',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    carregarPlano();
  }, []);
  return (
    <DashboardLayout userType="paciente">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meu Plano Alimentar</h1>
            <p className="text-muted-foreground">
              {planoNutricional ? `Plano: ${planoNutricional.nome || 'Plano Personalizado'}` : 'Nenhum plano associado'}
            </p>
          </div>
          <Button asChild>
            <Link to="/paciente/registrar">
              Registrar refeição
            </Link>
          </Button>
        </div>
        
        {loading ? (
          <Card>
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground">Carregando seu plano nutricional...</p>
              </div>
            </CardContent>
          </Card>
        ) : !planoNutricional ? (
          <Card>
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum plano associado</h3>
                <p className="text-muted-foreground mb-4">
                  Você ainda não possui um plano nutricional associado.
                </p>
                <p className="text-sm text-muted-foreground">
                  Entre em contato com seu nutricionista para criar um plano personalizado.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Meu Plano Nutricional</CardTitle>
              <CardDescription>
                {planoNutricional.descricao || 'Plano personalizado criado pelo seu nutricionista'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {planoNutricional.refeicoes && planoNutricional.refeicoes.length > 0 ? (
                  planoNutricional.refeicoes.map((refeicao: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-lg flex items-center gap-2">
                            {refeicao.descricao || `Refeição ${index + 1}`}
                            <Badge variant="outline" className="ml-2">
                              <Clock className="h-3 w-3 mr-1" /> 
                              {refeicao.horario || 'Horário não definido'}
                            </Badge>
                          </h3>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Descrição:</span>
                          <span className="text-muted-foreground">{refeicao.descricao || 'Não especificada'}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">Porções:</span>
                          <span className="text-muted-foreground">{refeicao.porcoes || 'Não especificadas'}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">Nenhuma refeição definida neste plano.</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consulte seu nutricionista para adicionar refeições ao seu plano.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
