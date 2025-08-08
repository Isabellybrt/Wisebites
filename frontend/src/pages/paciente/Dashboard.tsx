
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, FileText, CheckCircle2, XCircle, Bell, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { clienteAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function PacienteDashboard() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>({
    cliente: { nome: 'Paciente' },
    estatisticas: {
      adesaoDiaria: 0,
      refeicoesPlanejadas: 0,
      refeicoesRegistradas: 0,
      registrosSemana: 0,
    },
    registrosHoje: [],
    proximaRefeicao: null,
  });

  useEffect(() => {
    const carregarDashboard = async () => {
      try {
        setLoading(true);
        const data = await clienteAPI.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
        toast({
          title: 'Erro',
          description: 'Erro ao carregar dados do dashboard',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && !isLoading) {
      carregarDashboard();
    }
  }, [isAuthenticated, isLoading]);

  // Se ainda está carregando a autenticação, mostrar loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não está autenticado, não deveria chegar aqui (ProtectedRoute deveria redirecionar)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Não autenticado</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout userType="paciente">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Olá, {dashboardData.cliente.nome}!</h1>
            <p className="text-muted-foreground">Seu resumo nutricional de hoje</p>
          </div>
          <Button className="md:w-auto w-full" asChild>
            <Link to="/paciente/registrar">
              <Calendar className="mr-2 h-4 w-4" />
              Registrar refeição
            </Link>
          </Button>
        </div>
        
        {/* Progresso do dia */}
        <Card>
          <CardHeader>
            <CardTitle>Progresso do dia</CardTitle>
            <CardDescription>Seu desempenho de hoje no plano alimentar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Adesão ao plano alimentar</span>
                  <span className="text-sm font-medium">{dashboardData.estatisticas.adesaoDiaria}%</span>
                </div>
                <Progress value={dashboardData.estatisticas.adesaoDiaria} />
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Refeições registradas hoje</p>
                    <p className="text-2xl font-bold">{dashboardData.estatisticas.refeicoesRegistradas}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Registros na semana</p>
                    <p className="text-2xl font-bold">{dashboardData.estatisticas.registrosSemana}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Próxima refeição */}
        {dashboardData.proximaRefeicao && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Próxima refeição
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{dashboardData.proximaRefeicao.nome}</p>
                  <p className="text-sm text-muted-foreground">
                    {dashboardData.proximaRefeicao.horario}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Ver detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Registros de hoje */}
        {dashboardData.registrosHoje.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Registros de hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.registrosHoje.map((registro: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{registro.tipoRefeicao}</p>
                        <p className="text-sm text-muted-foreground">{registro.horario}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{registro.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Ações rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Meu Plano Alimentar
              </CardTitle>
              <CardDescription>Visualize seu plano nutricional personalizado</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to="/paciente/plano">
                  Ver plano
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Mensagens
              </CardTitle>
              <CardDescription>Comunique-se com seu nutricionista</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/paciente/mensagens">
                  Ver mensagens
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
