
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UserRound, Plus, Pencil, Trash, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

// Esquema de validação para o formulário de paciente
const pacienteSchema = z.object({
  nome: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  idade: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) > 0, {
    message: 'Idade deve ser um número positivo',
  }),
  peso: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Peso deve ser um número positivo',
  }),
  altura: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Altura deve ser um número positivo',
  }),
  objetivo: z.string().min(5, { message: 'Objetivo deve ter pelo menos 5 caracteres' }),
  planoId: z.number().optional(),
});

type PacienteFormValues = z.infer<typeof pacienteSchema>;

export default function Pacientes() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para gerenciar os modais
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<any>(null);

  // Carregar pacientes e planos da API
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
  
  // Função para associar plano ao paciente
  const associarPlano = async (id_cliente: number, id_planoNutricional: number) => {
    try {
      await nutricionistaAPI.associarPlano({ id_cliente, id_planoNutricional });
      toast({
        title: 'Sucesso',
        description: 'Plano associado ao paciente com sucesso',
      });
      
      // Recarregar dados
      const pacientesResponse = await nutricionistaAPI.getClients();
      setPacientes(pacientesResponse.clientes || []);
      
    } catch (error) {
      console.error('Erro ao associar plano:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao associar plano ao paciente',
        variant: 'destructive',
      });
    }
  };
  
  // Form para criar/editar pacientes
  const form = useForm<PacienteFormValues>({
    resolver: zodResolver(pacienteSchema),
    defaultValues: {
      nome: '',
      email: '',
      idade: '',
      peso: '',
      altura: '',
      objetivo: '',
      planoId: undefined,
    },
  });
  
  // Função para adicionar ou atualizar paciente
  const onSubmit = async (values: PacienteFormValues) => {
    try {
      if (selectedPaciente) {
        // Editar paciente existente
        if (values.planoId && values.planoId !== selectedPaciente.planoNutricional?.id_planoNutricional) {
          // Associar novo plano ao paciente
          await associarPlano(selectedPaciente.id_cliente, values.planoId);
        }
        
        toast({
          title: "Paciente atualizado",
          description: `Os dados de ${values.nome} foram atualizados com sucesso.`,
        });
      } else {
        // Adicionar novo paciente (não implementado ainda)
        toast({
          title: "Funcionalidade não implementada",
          description: "Para adicionar novos pacientes, use a tela de Cadastrar Paciente.",
        });
      }
      setFormOpen(false);
      setSelectedPaciente(null);
    } catch (error) {
      console.error('Erro ao salvar paciente:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao salvar dados do paciente',
        variant: 'destructive',
      });
    }
  };
  
  // Função para abrir o formulário para edição
  const handleEdit = (paciente: any) => {
    setSelectedPaciente(paciente);
    form.reset({
      nome: paciente.usuario?.nome || paciente.nome,
      email: paciente.usuario?.email || paciente.email,
      idade: paciente.idade?.toString() || '',
      peso: paciente.pesoAtual?.toString() || '',
      altura: paciente.altura?.toString() || '',
      objetivo: paciente.objetivo || '',
      planoId: paciente.planoNutricional?.id_planoNutricional,
    });
    setFormOpen(true);
  };
  
  // Função para abrir o diálogo de confirmação de exclusão
  const handleDeleteClick = (paciente: any) => {
    setSelectedPaciente(paciente);
    setDeleteDialogOpen(true);
  };
  
  // Função para confirmar exclusão
  const confirmDelete = () => {
    if (selectedPaciente) {
      setPacientes(pacientes.filter(p => p.id !== selectedPaciente.id));
      toast({
        title: "Paciente removido",
        description: `${selectedPaciente.nome} foi removido da sua lista de pacientes.`,
      });
      setDeleteDialogOpen(false);
      setSelectedPaciente(null);
    }
  };
  
  // Função para abrir formulário para novo paciente
  const handleAddNew = () => {
    setSelectedPaciente(null);
    form.reset({
      nome: '',
      email: '',
      idade: '',
      peso: '',
      altura: '',
      objetivo: '',
      planoId: undefined,
    });
    setFormOpen(true);
  };

  return (
    <DashboardLayout userType="nutricionista">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Meus Pacientes</h1>
          <Button onClick={() => navigate('/nutricionista/cadastrar-paciente')} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Cadastrar Paciente
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Lista de Pacientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Carregando pacientes...</p>
                </div>
              ) : pacientes.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhum paciente cadastrado ainda.</p>
                  <Button 
                    onClick={() => navigate('/nutricionista/cadastrar-paciente')}
                    className="mt-4"
                  >
                    Cadastrar primeiro paciente
                  </Button>
                </div>
              ) : (
                pacientes.map((paciente: any) => (
                  <div key={paciente.id_cliente} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserRound className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{paciente.usuario?.nome || paciente.nome}</h3>
                      <p className="text-sm text-muted-foreground">{paciente.usuario?.email || paciente.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Idade: {paciente.idade} anos | Peso: {paciente.pesoAtual}kg | Altura: {paciente.altura}m
                      </p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-sm font-medium">
                        {paciente.planoNutricional ? 'Plano Ativo' : 'Sem plano'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Objetivo: {paciente.objetivo}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleEdit(paciente)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => navigate(`/nutricionista/pacientes/${paciente.id_cliente}/historico`)}
                      >
                        <Calendar className="h-4 w-4" />
                        <span className="sr-only">Histórico</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleDeleteClick(paciente)}
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
      
      {/* Modal de formulário para adicionar/editar paciente */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedPaciente ? 'Editar Paciente' : 'Adicionar Paciente'}</DialogTitle>
            <DialogDescription>
              {selectedPaciente 
                ? 'Edite os dados do paciente e clique em salvar quando terminar.' 
                : 'Preencha os dados do novo paciente e clique em adicionar quando terminar.'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do paciente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="email@exemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="idade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade</FormLabel>
                      <FormControl>
                        <Input placeholder="0" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="peso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso (kg)</FormLabel>
                      <FormControl>
                        <Input placeholder="0.0" type="number" step="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="altura"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Altura (cm)</FormLabel>
                      <FormControl>
                        <Input placeholder="0" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="planoId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plano Alimentar</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value ? parseInt(e.target.value) : undefined;
                            field.onChange(value);
                          }}
                        >
                          <option value="">Selecione um plano</option>
                          {planos.map((plano: any) => (
                            <option key={plano.id_planoNutricional} value={plano.id_planoNutricional}>
                              {plano.nome || 'Plano Personalizado'} - {plano.cliente?.usuario?.nome || 'N/A'}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="objetivo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objetivo</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva o objetivo do paciente" 
                        className="resize-none" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">
                  {selectedPaciente ? 'Salvar Alterações' : 'Adicionar Paciente'}
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
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o paciente
              {selectedPaciente && ` ${selectedPaciente.nome}`} e removerá seus dados do sistema.
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
