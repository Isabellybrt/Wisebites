
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Plus, Pencil, Trash, Plus as PlusIcon, User } from 'lucide-react';
import { nutricionistaAPI } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Esquema de validação para o formulário de plano alimentar
const planoSchema = z.object({
  pacienteId: z.number().min(1, { message: 'Selecione um paciente' }),
  nome: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  descricao: z.string().min(5, { message: 'Descrição deve ter pelo menos 5 caracteres' }),
});

type PlanoFormValues = z.infer<typeof planoSchema>;

export default function Planos() {
  const { toast } = useToast();
  const [planos, setPlanos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para gerenciar os modais
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPlano, setSelectedPlano] = useState<any>(null);
  const [refeicoes, setRefeicoes] = useState<{ 
    nome: string; 
    horario: string; 
    descricao: string; 
    porcoes: string; 
  }[]>([]);

  // Carregar dados da API
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        
        // Carregar pacientes
        const pacientesResponse = await nutricionistaAPI.getClients();
        setPacientes(pacientesResponse.clientes || []);
        
        // Carregar planos
        const planosResponse = await nutricionistaAPI.getPlanos();
        setPlanos(planosResponse.planos || []);
        
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast({
          title: 'Erro',
          description: 'Erro ao carregar dados',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);
  
  // Form para criar/editar planos
  const form = useForm<PlanoFormValues>({
    resolver: zodResolver(planoSchema),
    defaultValues: {
      pacienteId: 0,
      nome: '',
      descricao: '',
    },
  });
  
  // Função para adicionar uma nova refeição temporária
  const adicionarRefeicao = () => {
    setRefeicoes([...refeicoes, { nome: '', horario: '', descricao: '', porcoes: '' }]);
  };
  
  // Função para remover uma refeição temporária
  const removerRefeicao = (index: number) => {
    const novasRefeicoes = refeicoes.filter((_, i) => i !== index);
    setRefeicoes(novasRefeicoes);
  };
  
  // Função para atualizar dados de uma refeição temporária
  const atualizarRefeicao = (index: number, field: string, value: string) => {
    const novasRefeicoes = [...refeicoes];
    novasRefeicoes[index] = { ...novasRefeicoes[index], [field]: value };
    setRefeicoes(novasRefeicoes);
  };
  
  // Função para adicionar ou atualizar plano
  const onSubmit = async (values: PlanoFormValues) => {
    if (refeicoes.length === 0) {
      toast({ title: 'Erro', description: 'Adicione pelo menos uma refeição', variant: 'destructive' });
      return;
    }
    try {
      const planoData = {
        id_cliente: values.pacienteId,
        nome: values.nome,
        descricao: values.descricao,
        refeicoes: refeicoes.map(r => ({
          horario: r.horario,
          descricao: r.descricao,
          porcoes: r.porcoes,
        })),
      };

      if (selectedPlano) {
        // Editar plano existente
        await nutricionistaAPI.updateNutritionalPlan(selectedPlano.id_planoNutricional, planoData);
        toast({
          title: "Plano atualizado",
          description: `O plano ${values.nome} foi atualizado com sucesso.`,
        });
      } else {
        // Criar novo plano
        await nutricionistaAPI.createNutritionalPlan(planoData);
        toast({
          title: "Plano adicionado",
          description: `O plano ${values.nome} foi adicionado com sucesso.`,
        });
      }
      
      // Recarregar dados
      const pacientesResponse = await nutricionistaAPI.getClients();
      setPacientes(pacientesResponse.clientes || []);
      
      // Recarregar planos
      const planosResponse = await nutricionistaAPI.getPlanos();
      setPlanos(planosResponse.planos || []);
      
      setFormOpen(false);
      setSelectedPlano(null);
      setRefeicoes([]);
      form.reset();
    } catch (error) {
      console.error('Erro ao salvar plano:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao salvar plano',
        variant: 'destructive',
      });
    }
  };
  
  // Função para abrir o formulário para edição
  const handleEdit = (plano: any) => {
    setSelectedPlano(plano);
    form.reset({
      pacienteId: plano.id_cliente ?? 0,
      nome: plano.nome ?? '',
      descricao: plano.descricao ?? '',
    });
    setRefeicoes(plano.refeicoes);
    setFormOpen(true);
  };
  
  // Função para abrir o diálogo de confirmação de exclusão
  const handleDeleteClick = (plano: any) => {
    setSelectedPlano(plano);
    setDeleteDialogOpen(true);
  };
  
  // Função para confirmar exclusão
  const confirmDelete = () => {
    if (selectedPlano) {
      setPlanos(planos.filter(p => p.id !== selectedPlano.id));
      toast({
        title: "Plano removido",
        description: `O plano ${selectedPlano.nome} foi removido com sucesso.`,
      });
      setDeleteDialogOpen(false);
      setSelectedPlano(null);
    }
  };
  
  // Função para abrir formulário para novo plano
  const handleAddNew = () => {
    setSelectedPlano(null);
    form.reset({
      pacienteId: 0,
      nome: '',
      descricao: '',
    });
    setRefeicoes([]);
    setFormOpen(true);
  };

  return (
    <DashboardLayout userType="nutricionista">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Planos Alimentares</h1>
          <Button onClick={handleAddNew} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Novo Plano
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Meus Planos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Carregando planos...</p>
                </div>
              ) : planos.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhum plano cadastrado ainda.</p>
                  <Button 
                    onClick={handleAddNew}
                    className="mt-4"
                  >
                    Criar primeiro plano
                  </Button>
                </div>
              ) : (
                planos.map((plano: any) => (
                  <div key={plano.id_planoNutricional} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{plano.nome || 'Plano Personalizado'}</h3>
                      <p className="text-sm text-muted-foreground">
                        {plano.refeicoes?.length || 0} refeições diárias
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Paciente: {plano.cliente?.usuario?.nome || 'N/A'}
                      </p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-sm font-medium">1 paciente</p>
                      <p className="text-xs text-muted-foreground">
                        Criado em: {new Date(plano.dataCriacao).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleEdit(plano)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleDeleteClick(plano)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Modal de formulário para adicionar/editar plano */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedPlano ? 'Editar Plano Alimentar' : 'Adicionar Plano Alimentar'}</DialogTitle>
            <DialogDescription>
              {selectedPlano 
                ? 'Edite os detalhes do plano e clique em salvar quando terminar.' 
                : 'Preencha os detalhes do novo plano e clique em adicionar quando terminar.'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="pacienteId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paciente</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      >
                        <option value={0}>Selecione um paciente</option>
                        {pacientes.map((paciente: any) => (
                          <option key={paciente.id_cliente} value={paciente.id_cliente}>
                            {paciente.usuario?.nome || paciente.nome} - {paciente.objetivo}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Plano</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do plano alimentar" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva o objetivo deste plano alimentar" 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Refeições</h4>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={adicionarRefeicao}
                    className="flex items-center gap-1"
                  >
                    <PlusIcon className="h-3 w-3" /> 
                    Adicionar Refeição
                  </Button>
                </div>
                
                {refeicoes.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">
                    Nenhuma refeição adicionada. Clique no botão acima para adicionar refeições.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {refeicoes.map((refeicao, index) => (
                      <div 
                        key={index} 
                        className="border rounded-md p-4 relative bg-background"
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2"
                          onClick={() => removerRefeicao(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Nome da Refeição</label>
                            <Input
                              value={refeicao.nome}
                              onChange={(e) => atualizarRefeicao(index, 'nome', e.target.value)}
                              placeholder="Ex: Café da Manhã"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Horário</label>
                            <Input
                              value={refeicao.horario}
                              onChange={(e) => atualizarRefeicao(index, 'horario', e.target.value)}
                              placeholder="Ex: 07:00"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                        <label className="text-sm font-medium">Descrição</label>
                        <Textarea
                             value={refeicao.descricao}
                             onChange={(e) => atualizarRefeicao(index, 'descricao', e.target.value)}
                             placeholder="Ex: Ovos, pão integral, frutas"
                             rows={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Porções</label>
                          <Input
                            value={refeicao.porcoes}
                            onChange={(e) => atualizarRefeicao(index, 'porcoes', e.target.value)}
                            placeholder="Ex: 2 ovos, 1 fatia, 1 porção"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button 
                  type="submit" 
                  disabled={refeicoes.length === 0}
                >
                  {selectedPlano ? 'Salvar Alterações' : 'Adicionar Plano'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo de confirmação de exclusão */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o plano alimentar
              {selectedPlano && ` "${selectedPlano.nome}"`} e removerá seus dados do sistema.
              
              {selectedPlano && selectedPlano.pacientes > 0 && (
                <p className="mt-2 text-destructive">
                  Atenção: Este plano está atribuído a {selectedPlano.pacientes} pacientes.
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
