import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { nutricionistaAPI } from '@/lib/api';

// Função para traduzir tipos de refeição
const traduzirTipoRefeicao = (tipo: string) => {
  const traducoes: { [key: string]: string } = {
    cafe_manha: 'Café da Manhã',
    lanche_manha: 'Lanche da Manhã',
    almoco: 'Almoço',
    lanche_tarde: 'Lanche da Tarde',
    jantar: 'Jantar',
    ceia: 'Ceia',
  };
  return traducoes[tipo] || tipo;
};

export default function HistoricoPaciente() {
  const { id_cliente } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [registrosRefeicao, setRegistrosRefeicao] = useState([]);
  const [paciente, setPaciente] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarHistorico = async () => {
      try {
        setLoading(true);
        
        // Carregar histórico de refeições
        const response = await nutricionistaAPI.getHistoricoRefeicoesPaciente(parseInt(id_cliente!));
        setRegistrosRefeicao(response.registrosRefeicao || []);
        
        // Se há registros, pegar dados do primeiro para mostrar info do paciente
        if (response.registrosRefeicao && response.registrosRefeicao.length > 0) {
          setPaciente(response.registrosRefeicao[0].cliente);
        }
        
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        toast({
          title: 'Erro',
          description: 'Erro ao carregar histórico do paciente',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (id_cliente) {
      carregarHistorico();
    }
  }, [id_cliente]);

  // Agrupar registros por data
  const registrosPorData = registrosRefeicao.reduce((acc: any, registro: any) => {
    const data = registro.data;
    if (!acc[data]) {
      acc[data] = [];
    }
    acc[data].push(registro);
    return acc;
  }, {});

  // Ordenar datas
  const datasOrdenadas = Object.keys(registrosPorData).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <DashboardLayout userType="nutricionista">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/nutricionista/pacientes')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Histórico de Refeições</h1>
            {paciente && (
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <User className="h-4 w-4" />
                {paciente.usuario?.nome || 'Paciente'}
              </p>
            )}
          </div>
        </div>

        {loading ? (
          <Card>
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground">Carregando histórico...</p>
              </div>
            </CardContent>
          </Card>
        ) : registrosRefeicao.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum registro encontrado</h3>
                <p className="text-muted-foreground">
                  Este paciente ainda não registrou nenhuma refeição.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {datasOrdenadas.map((data) => (
              <Card key={data}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {format(new Date(data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {registrosPorData[data]
                      .sort((a: any, b: any) => a.horario.localeCompare(b.horario))
                      .map((registro: any) => (
                        <div key={registro.id_registroRefeicao} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">
                                  {traduzirTipoRefeicao(registro.tipoRefeicao)}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  {registro.horario}
                                </div>
                              </div>
                              <p className="text-sm font-medium mb-1">{registro.descricao}</p>
                              {registro.observacoes && (
                                <p className="text-sm text-muted-foreground">
                                  <span className="font-medium">Observações:</span> {registro.observacoes}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
