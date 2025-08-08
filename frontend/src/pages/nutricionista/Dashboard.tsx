
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRound, Users, Calendar, FileText } from 'lucide-react';
import { nutricionistaAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export default function NutricionistaDashboard() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>({
    estatisticas: {
      totalPacientes: 0,
      pacientesAtivos: 0,
      planosAtivos: 0,
      registrosRecentes: 0,
    },
    pacientesRecentes: [],
    registrosRecentes: [],
  });

  useEffect(() => {
    const carregarDashboard = async () => {
      try {
        setLoading(true);
        const data = await nutricionistaAPI.getDashboardData();
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

    carregarDashboard();
  }, []);

  return (
    <DashboardLayout userType="nutricionista">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard do Nutricionista</h1>
        
        {/* Cards de estatísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.estatisticas.totalPacientes}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.estatisticas.pacientesAtivos} ativos
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pacientes Ativos</CardTitle>
              <UserRound className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.estatisticas.pacientesAtivos}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.estatisticas.totalPacientes > 0 
                  ? Math.round((dashboardData.estatisticas.pacientesAtivos / dashboardData.estatisticas.totalPacientes) * 100)
                  : 0}% do total
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.estatisticas.registrosRecentes}</div>
              <p className="text-xs text-muted-foreground">
                registros na última semana
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Planos Ativos</CardTitle>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardData.estatisticas.planosAtivos}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardData.estatisticas.totalPacientes > 0 
                  ? Math.round((dashboardData.estatisticas.planosAtivos / dashboardData.estatisticas.totalPacientes) * 100)
                  : 0}% dos pacientes
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Registros recentes */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Registros Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.registrosRecentes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhum registro recente</p>
                ) : (
                  dashboardData.registrosRecentes.slice(0, 5).map((registro: any) => (
                    <div key={registro.id_registroRefeicao} className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserRound className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {registro.cliente?.usuario?.nome || 'Paciente'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {registro.tipoRefeicao} - {registro.horario}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Pacientes recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Pacientes Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.pacientesRecentes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhum paciente recente</p>
                ) : (
                  dashboardData.pacientesRecentes.map((paciente: any) => (
                    <div key={paciente.id_cliente} className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                        <UserRound className="h-5 w-5 text-secondary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {paciente.usuario?.nome || 'Paciente'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {paciente.planoNutricional?.nome || 'Sem plano'}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
