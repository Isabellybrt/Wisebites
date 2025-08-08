
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Search, 
  Plus, 
  X,
  CheckCircle2,
  XCircle,
  Camera,
  Zap
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { clienteAPI } from '@/lib/api';
import { FoodRecognitionUpload } from '@/components/food-recognition/FoodRecognitionUpload';
import { DetectedFoodsList } from '@/components/food-recognition/DetectedFoodsList';
import { DetectedFood } from '@/services/foodRecognitionService';

// Dados para tipos de refeição
const tiposRefeicao = [
  { value: 'cafe_manha', label: 'Café da Manhã' },
  { value: 'lanche_manha', label: 'Lanche da Manhã' },
  { value: 'almoco', label: 'Almoço' },
  { value: 'lanche_tarde', label: 'Lanche da Tarde' },
  { value: 'jantar', label: 'Jantar' },
  { value: 'ceia', label: 'Ceia' },
];

const alimentosSugeridos = [
  { id: 1, nome: 'Arroz integral', adequado: true },
  { id: 2, nome: 'Feijão', adequado: true },
  { id: 3, nome: 'Frango grelhado', adequado: true },
  { id: 4, nome: 'Salada verde', adequado: true },
  { id: 5, nome: 'Suco natural', adequado: true },
  { id: 6, nome: 'Pão branco', adequado: false },
  { id: 7, nome: 'Refrigerante', adequado: false },
  { id: 8, nome: 'Biscoito recheado', adequado: false },
  { id: 9, nome: 'Bolo de chocolate', adequado: false },
  { id: 10, nome: 'Batata frita', adequado: false },
];

export default function RegistrarRefeicao() {
  const { toast } = useToast();
  const [data, setData] = useState<Date | undefined>(new Date());
  const [tipoRefeicao, setTipoRefeicao] = useState('');
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [alimentosSelecionados, setAlimentosSelecionados] = useState<Array<{id: number, nome: string, adequado: boolean}>>([]);
  const [observacoes, setObservacoes] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Estados para reconhecimento de alimentos
  const [detectedFoods, setDetectedFoods] = useState<DetectedFood[]>([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [activeTab, setActiveTab] = useState('manual');

  // Filtrar alimentos baseado no termo de pesquisa
  const alimentosFiltrados = alimentosSugeridos.filter(alimento => 
    alimento.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  const adicionarAlimento = (alimento: {id: number, nome: string, adequado: boolean}) => {
    if (!alimentosSelecionados.some(a => a.id === alimento.id)) {
      setAlimentosSelecionados([...alimentosSelecionados, alimento]);
      setTermoPesquisa('');
    }
  };

  const removerAlimento = (id: number) => {
    setAlimentosSelecionados(alimentosSelecionados.filter(alimento => alimento.id !== id));
  };

  // Handlers para reconhecimento de alimentos
  const handleFoodsDetected = (foods: DetectedFood[]) => {
    setDetectedFoods(foods);
  };

  const handleTotalCalories = (calories: number) => {
    setTotalCalories(calories);
  };

  const handleFoodsUpdate = (foods: any[]) => {
    setDetectedFoods(foods);
    const newTotal = foods.reduce((sum, food) => sum + (food.customCalories || food.estimatedCalories), 0);
    setTotalCalories(newTotal);
  };

  const handleRemoveFood = (foodId: string) => {
    setDetectedFoods(prev => prev.filter(food => food.id !== foodId));
    const newTotal = detectedFoods.filter(food => food.id !== foodId)
      .reduce((sum, food) => sum + food.estimatedCalories, 0);
    setTotalCalories(newTotal);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!data || !tipoRefeicao) {
      toast({
        title: 'Erro',
        description: 'Por favor, preencha a data e tipo de refeição',
        variant: 'destructive',
      });
      return;
    }

    // Verificar se há alimentos selecionados (manual ou detectados)
    const hasManualFoods = alimentosSelecionados.length > 0;
    const hasDetectedFoods = detectedFoods.length > 0;
    
    if (!hasManualFoods && !hasDetectedFoods) {
      toast({
        title: 'Erro',
        description: 'Por favor, adicione alimentos manualmente ou use o reconhecimento por IA',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Preparar descrição baseada no método usado
      let descricao = '';
      if (activeTab === 'manual') {
        descricao = alimentosSelecionados.map(a => a.nome).join(', ');
      } else {
        descricao = detectedFoods.map(f => `${f.name} (${f.estimatedPortion})`).join(', ');
      }
      
      // Preparar dados para enviar
      const dadosRefeicao = {
        data: format(data, 'yyyy-MM-dd'),
        tipoRefeicao,
        descricao,
        horario: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        observacoes,
        caloriasEstimadas: activeTab === 'ai' ? totalCalories : undefined,
        alimentosDetectados: activeTab === 'ai' ? detectedFoods : undefined,
      };
      
      // Enviar para a API
      await clienteAPI.registrarRefeicao(dadosRefeicao);
      
      toast({
        title: 'Sucesso',
        description: 'Refeição registrada com sucesso!',
      });
      
      // Reset do formulário
      setTipoRefeicao('');
      setAlimentosSelecionados([]);
      setDetectedFoods([]);
      setTotalCalories(0);
      setObservacoes('');
      setActiveTab('manual');
      
    } catch (error) {
      console.error('Erro ao registrar refeição:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao registrar refeição. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout userType="paciente">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Registrar Refeição</h1>
        
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Refeição</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Seletor de data */}
                  <div className="space-y-2">
                    <Label htmlFor="data">Data</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !data && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {data ? format(data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : <span>Selecione uma data</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 pointer-events-auto">
                        <Calendar
                          mode="single"
                          selected={data}
                          onSelect={setData}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  {/* Seletor de tipo de refeição */}
                  <div className="space-y-2">
                    <Label htmlFor="tipo-refeicao">Tipo de Refeição</Label>
                    <Select value={tipoRefeicao} onValueChange={setTipoRefeicao}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de refeição" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposRefeicao.map((tipo) => (
                          <SelectItem key={tipo.value} value={tipo.value}>
                            {tipo.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Abas para método de entrada */}
                <div className="space-y-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="manual" className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        Manual
                      </TabsTrigger>
                      <TabsTrigger value="ai" className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        IA
                      </TabsTrigger>
                    </TabsList>

                    {/* Aba Manual */}
                    <TabsContent value="manual" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="alimentos">Alimentos</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="alimentos"
                              placeholder="Pesquisar alimentos..."
                              className="pl-8"
                              value={termoPesquisa}
                              onChange={(e) => setTermoPesquisa(e.target.value)}
                            />
                            {termoPesquisa && alimentosFiltrados.length > 0 && (
                              <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border">
                                <ul className="py-1 max-h-60 overflow-auto">
                                  {alimentosFiltrados.map((alimento) => (
                                    <li
                                      key={alimento.id}
                                      className="flex items-center justify-between px-4 py-2 hover:bg-muted cursor-pointer"
                                      onClick={() => adicionarAlimento(alimento)}
                                    >
                                      <span>{alimento.nome}</span>
                                      {alimento.adequado ? (
                                        <CheckCircle2 className="h-4 w-4 text-secondary" />
                                      ) : (
                                        <XCircle className="h-4 w-4 text-destructive" />
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          <Button type="button" variant="outline" onClick={() => {
                            const customAlimento = { id: Date.now(), nome: termoPesquisa, adequado: false };
                            if (termoPesquisa) {
                              adicionarAlimento(customAlimento);
                            }
                          }}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Lista de alimentos selecionados */}
                      {alimentosSelecionados.length > 0 && (
                        <div className="border rounded-md p-4">
                          <p className="text-sm font-medium mb-2">Alimentos Selecionados:</p>
                          <ul className="space-y-2">
                            {alimentosSelecionados.map((alimento) => (
                              <li 
                                key={alimento.id} 
                                className="flex items-center justify-between text-sm bg-muted px-3 py-2 rounded"
                              >
                                <div className="flex items-center gap-2">
                                  {alimento.adequado ? (
                                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                                  ) : (
                                    <XCircle className="h-4 w-4 text-destructive" />
                                  )}
                                  <span>{alimento.nome}</span>
                                </div>
                                <button 
                                  type="button" 
                                  onClick={() => removerAlimento(alimento.id)}
                                  className="text-gray-600 hover:text-destructive"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </TabsContent>

                    {/* Aba IA */}
                    <TabsContent value="ai" className="space-y-4">
                      
                      <FoodRecognitionUpload
                        onFoodsDetected={handleFoodsDetected}
                        onTotalCalories={handleTotalCalories}
                      />
                      
                      {detectedFoods.length > 0 && (
                        <DetectedFoodsList
                          foods={detectedFoods}
                          onFoodsUpdate={handleFoodsUpdate}
                          onRemoveFood={handleRemoveFood}
                        />
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
                
                {/* Observações */}
                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações (opcional)</Label>
                  <Textarea
                    id="observacoes"
                    placeholder="Compartilhe mais detalhes sobre essa refeição..."
                    rows={4}
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                  />
                </div>

                {/* Resumo de calorias (se usando IA) */}
                {activeTab === 'ai' && totalCalories > 0 && (
                  <div className="bg-primary/5 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Total de Calorias Estimadas</p>
                        <p className="text-2xl font-bold text-primary">{totalCalories} kcal</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Alimentos Detectados</p>
                        <p className="text-lg font-semibold">{detectedFoods.length}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                  {loading ? 'Registrando...' : 'Registrar Refeição'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </DashboardLayout>
  );
}
