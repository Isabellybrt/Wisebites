
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MainLayout } from '@/components/layout/MainLayout';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
  confirmPassword: z.string(),
  userType: z.enum(['nutricionista', 'paciente']),
  telefone: z.string().optional(),
  especialidade: z.string().optional(),
  idade: z.number().min(1).max(120).optional(),
  pesoAtual: z.number().min(1).max(500).optional(),
  altura: z.number().min(0.5).max(3).optional(),
  objetivo: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'paciente',
      telefone: '',
      especialidade: '',
      idade: 25,
      pesoAtual: 70,
      altura: 1.70,
      objetivo: 'Perder peso',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      console.log('📝 Dados do formulário:', values);
      
      const userData = {
        nome: values.name,
        email: values.email,
        senha: values.password,
        tipo_usuario: values.userType,
        telefone: values.telefone || '',
        // Dados específicos baseados no tipo de usuário
        ...(values.userType === 'nutricionista' && {
          especialidade: values.especialidade || 'Nutrição Clínica',
        }),
        ...(values.userType === 'paciente' && {
          idade: values.idade || 25,
          pesoAtual: values.pesoAtual || 70.0,
          altura: values.altura || 1.70,
          objetivo: values.objetivo || 'Perder peso',
        }),
      };

      console.log('📤 Enviando dados para API:', userData);

      await register(userData);

      console.log('✅ Registro realizado com sucesso');

      toast.success('Conta criada com sucesso!');
      
      // Redirecionar baseado no tipo de usuário (será feito pelo AuthContext)
      navigate('/');
    } catch (error: any) {
      console.error('❌ Erro no registro:', error);
      console.error('❌ Detalhes do erro:', error.response?.data);
      toast.error(error.response?.data?.message || 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
        <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold">Criar uma conta</h1>
            <p className="mt-2 text-sm text-gray-600">
              Preencha suas informações para começar
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input placeholder="João Silva" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seuemail@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de usuário</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione seu tipo de usuário" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="nutricionista">Nutricionista</SelectItem>
                        <SelectItem value="paciente">Paciente</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="(11) 99999-9999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {form.watch('userType') === 'nutricionista' && (
                <FormField
                  control={form.control}
                  name="especialidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Especialidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Nutrição Clínica" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {form.watch('userType') === 'paciente' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="idade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Idade</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="25" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pesoAtual"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Peso atual (kg)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.1"
                              placeholder="70.0" 
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="altura"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Altura (metros)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01"
                            placeholder="1.70" 
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="objetivo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Objetivo</FormLabel>
                        <FormControl>
                          <Input placeholder="Perder peso" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Registrando...' : 'Registrar'}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Entre
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
